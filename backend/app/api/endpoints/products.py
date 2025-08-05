from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
from app.services.gemini_service import gemini_service
from app.models.database import get_db, Product
from sqlalchemy.orm import Session
from datetime import datetime

router = APIRouter()

class ProductCreate(BaseModel):
    name: str
    category: str
    price: float
    brand: str
    stock: int = 0
    features: List[str] = []

class ProductResponse(BaseModel):
    id: int
    name: str
    description: str
    price: float
    category: str
    brand: str
    stock: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class ProductDescriptionRequest(BaseModel):
    product_name: str
    category: str
    features: List[str]

@router.post("/", response_model=ProductResponse)
async def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db)
):
    """
    Yeni ürün oluştur ve Gemini ile açıklama üret
    """
    try:
        # Gemini ile ürün açıklaması üret
        description = await gemini_service.generate_product_description(
            product_name=product.name,
            category=product.category,
            features=product.features
        )
        
        # Veritabanına kaydet
        db_product = Product(
            name=product.name,
            description=description,
            price=product.price,
            category=product.category,
            brand=product.brand,
            stock=product.stock,
            seller_id=1  # Demo için sabit seller_id
        )
        
        db.add(db_product)
        db.commit()
        db.refresh(db_product)
        
        return ProductResponse.from_orm(db_product)
        
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Ürün oluşturulamadı: {str(e)}"
        )

@router.get("/", response_model=List[ProductResponse])
async def get_products(
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    Ürünleri listele
    """
    query = db.query(Product)
    
    if category:
        query = query.filter(Product.category == category)
    
    products = query.offset(skip).limit(limit).all()
    return [ProductResponse.from_orm(p) for p in products]

@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    """
    Belirli bir ürünü getir
    """
    product = db.query(Product).filter(Product.id == product_id).first()
    
    if not product:
        raise HTTPException(status_code=404, detail="Ürün bulunamadı")
    
    return ProductResponse.from_orm(product)

@router.post("/generate-description")
async def generate_product_description(
    request: ProductDescriptionRequest
):
    """
    Gemini ile ürün açıklaması üret
    """
    try:
        description = await gemini_service.generate_product_description(
            product_name=request.product_name,
            category=request.category,
            features=request.features
        )
        
        return {
            "product_name": request.product_name,
            "description": description,
            "message": "Ürün açıklaması başarıyla oluşturuldu"
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Ürün açıklaması oluşturulamadı: {str(e)}"
        )

@router.post("/compare")
async def compare_products(
    product_ids: List[int],
    db: Session = Depends(get_db)
):
    """
    Ürünleri karşılaştır
    """
    try:
        products = db.query(Product).filter(Product.id.in_(product_ids)).all()
        
        if len(products) < 2:
            raise HTTPException(
                status_code=400,
                detail="En az 2 ürün seçilmelidir"
            )
        
        # Ürün bilgilerini hazırla
        products_data = []
        for p in products:
            # Ortalama rating hesapla (demo için sabit)
            avg_rating = 4.2
            
            products_data.append({
                "id": p.id,
                "name": p.name,
                "price": p.price,
                "rating": avg_rating,
                "brand": p.brand,
                "category": p.category
            })
        
        # Gemini ile karşılaştırma yap
        comparison = await gemini_service.compare_products(products_data)
        
        return {
            "products": products_data,
            "comparison": comparison
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Ürün karşılaştırması yapılamadı: {str(e)}"
        ) 