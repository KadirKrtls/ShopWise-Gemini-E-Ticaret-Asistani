from fastapi import APIRouter, Depends, HTTPException, status, Form
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import timedelta

from app.models.database import get_db
from app.models.database import User, UserRole
from app.services.auth_service import AuthService

router = APIRouter()
security = HTTPBearer()

# Pydantic modelleri
class UserRegister(BaseModel):
    email: EmailStr
    username: str
    full_name: str
    password: str
    role: UserRole = UserRole.CUSTOMER
    phone: Optional[str] = None
    # Satıcı için ek alanlar
    company_name: Optional[str] = None
    tax_number: Optional[str] = None
    address: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str
    user: dict

class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    full_name: str
    role: str
    is_active: bool
    phone: Optional[str] = None
    company_name: Optional[str] = None
    tax_number: Optional[str] = None
    address: Optional[str] = None

# Dependency: Current user
async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    """Mevcut kullanıcıyı al"""
    token = credentials.credentials
    user = AuthService.get_user_by_token(db, token)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Geçersiz kimlik doğrulama bilgileri",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Pasif kullanıcı hesabı"
        )
    
    return user

# Dependency: Sadece satıcılar
async def get_current_seller(current_user: User = Depends(get_current_user)) -> User:
    """Sadece satıcı kullanıcıları için"""
    if current_user.role != UserRole.SELLER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Bu işlem için satıcı yetkisi gerekli"
        )
    return current_user

# Dependency: Sadece müşteriler
async def get_current_customer(current_user: User = Depends(get_current_user)) -> User:
    """Sadece müşteri kullanıcıları için"""
    if current_user.role != UserRole.CUSTOMER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Bu işlem için müşteri yetkisi gerekli"
        )
    return current_user

@router.post("/register", response_model=Token, summary="Kullanıcı Kaydı")
async def register(user_data: UserRegister, db: Session = Depends(get_db)):
    """
    Yeni kullanıcı kaydı oluştur
    - **Müşteri** veya **Satıcı** olarak kayıt olabilir
    - Satıcılar için ek şirket bilgileri gerekli
    """
    try:
        # Kullanıcı oluştur
        user = AuthService.create_user(
            db=db,
            email=user_data.email,
            username=user_data.username,
            full_name=user_data.full_name,
            password=user_data.password,
            role=user_data.role,
            phone=user_data.phone,
            company_name=user_data.company_name,
            tax_number=user_data.tax_number,
            address=user_data.address
        )
        
        # Token oluştur
        access_token = AuthService.create_access_token(
            data={"sub": str(user.id), "role": user.role.value}
        )
        refresh_token = AuthService.create_refresh_token()
        
        # Session kaydet
        AuthService.create_user_session(
            db=db,
            user_id=user.id,
            access_token=access_token,
            refresh_token=refresh_token
        )
        
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
            "user": {
                "id": user.id,
                "email": user.email,
                "username": user.username,
                "full_name": user.full_name,
                "role": user.role.value,
                "phone": user.phone,
                "company_name": user.company_name
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Kayıt işlemi sırasında hata: {str(e)}"
        )

@router.post("/login", response_model=Token, summary="Kullanıcı Girişi")
async def login(user_data: UserLogin, db: Session = Depends(get_db)):
    """
    Kullanıcı giriş işlemi
    - Email ve şifre ile giriş
    - Başarılı girişte JWT token döner
    """
    # Kullanıcı doğrulama
    user = AuthService.authenticate_user(db, user_data.email, user_data.password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Hatalı email veya şifre",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Hesabınız devre dışı bırakılmış"
        )
    
    # Token oluştur
    access_token = AuthService.create_access_token(
        data={"sub": str(user.id), "role": user.role.value}
    )
    refresh_token = AuthService.create_refresh_token()
    
    # Session kaydet
    AuthService.create_user_session(
        db=db,
        user_id=user.id,
        access_token=access_token,
        refresh_token=refresh_token
    )
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "full_name": user.full_name,
            "role": user.role.value,
            "phone": user.phone,
            "company_name": user.company_name,
            "tax_number": user.tax_number,
            "address": user.address
        }
    }

@router.post("/logout", summary="Çıkış Yap")
async def logout(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    """Kullanıcı çıkış işlemi"""
    token = credentials.credentials
    success = AuthService.logout_user(db, token)
    
    if success:
        return {"message": "Başarıyla çıkış yapıldı"}
    else:
        return {"message": "Çıkış yapılırken hata oluştu"}

@router.get("/me", response_model=UserResponse, summary="Profil Bilgisi")
async def get_profile(current_user: User = Depends(get_current_user)):
    """Mevcut kullanıcının profil bilgilerini al"""
    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        username=current_user.username,
        full_name=current_user.full_name,
        role=current_user.role.value,
        is_active=current_user.is_active,
        phone=current_user.phone,
        company_name=current_user.company_name,
        tax_number=current_user.tax_number,
        address=current_user.address
    )

@router.get("/seller/dashboard", summary="Satıcı Dashboard")
async def seller_dashboard(current_seller: User = Depends(get_current_seller)):
    """Sadece satıcılar için dashboard"""
    return {
        "message": f"Hoş geldiniz {current_seller.full_name}!",
        "company": current_seller.company_name,
        "dashboard_type": "seller",
        "features": [
            "Ürün Yönetimi",
            "Sipariş Takibi", 
            "Satış Raporları",
            "Müşteri Mesajları"
        ]
    }

@router.get("/customer/dashboard", summary="Müşteri Dashboard")
async def customer_dashboard(current_customer: User = Depends(get_current_customer)):
    """Sadece müşteriler için dashboard"""
    return {
        "message": f"Hoş geldiniz {current_customer.full_name}!",
        "dashboard_type": "customer",
        "features": [
            "Ürün Arama",
            "Sepet Yönetimi",
            "Sipariş Geçmişi",
            "Favori Ürünler",
            "Fiyat Takibi"
        ]
    }