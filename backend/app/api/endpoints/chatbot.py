from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, List
from app.services.gemini_service import gemini_service
from app.models.database import User
from app.api.endpoints.auth import get_current_user

router = APIRouter()

class ChatMessage(BaseModel):
    message: str
    context: Optional[str] = ""

class RoleBasedChatMessage(BaseModel):
    message: str
    user_role: str = "guest"  # customer, seller, admin, guest
    context: Optional[str] = ""

class ChatResponse(BaseModel):
    response: str
    suggestions: List[str] = []

@router.post("/chat", response_model=ChatResponse)
async def chat_with_assistant(
    chat_message: ChatMessage
):
    """
    Genel chatbot (giriş yapmamış kullanıcılar için)
    """
    try:
        # Genel prompt
        system_prompt = """
Sen ShopWise'ın yardımcı asistanısın. Kullanıcılara e-ticaret konusunda yardım ediyorsun.
Türkçe yanıt ver ve samimi ol. Ürün önerileri verebilir, alışveriş rehberliği yapabilirsin.
"""
        
        # Gemini'den yanıt al
        response = await gemini_service.generate_chat_response(
            user_message=chat_message.message,
            context=system_prompt + "\n\n" + chat_message.context
        )
        
        # Genel öneriler
        suggestions = [
            "500 TL altında spor ayakkabı öner",
            "En popüler ürünler neler?",
            "Kampanyalar hakkında bilgi ver",
            "Hesap nasıl oluşturabilirim?"
        ]
        
        return ChatResponse(
            response=response,
            suggestions=suggestions
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Chatbot yanıtı oluşturulamadı: {str(e)}"
        )

async def get_current_user_optional(
    credentials: Optional[str] = None
) -> Optional[User]:
    """Optional current user - hata vermez"""
    if not credentials:
        return None
    try:
        from app.api.endpoints.auth import get_current_user
        from fastapi.security import HTTPAuthorizationCredentials
        # Basit implementasyon
        return None
    except:
        return None

@router.post("/chat/role-based", response_model=ChatResponse)
async def role_based_chat(
    chat_message: RoleBasedChatMessage
):
    """
    Rol bazlı chatbot - Müşteri/Satıcı için özelleştirilmiş
    """
    try:
        # Kullanıcı rolü belirle
        user_role = chat_message.user_role
        
        # Rol bazlı sistem prompt'ları
        role_prompts = {
            "customer": """
Sen ShopWise'ın müşteri asistanısın. Müşterilere şu konularda yardım ediyorsun:
- Ürün önerileri ve karşılaştırmalar
- Fiyat sorgulamaları 
- Sipariş takibi
- Kampanya bilgileri
- Ürün incelemeleri

Samimi ve yardımcı ol. Türkçe yanıt ver.
""",
            "seller": """
Sen ShopWise'ın satıcı asistanısın. Satıcılara şu konularda rehberlik ediyorsun:
- Ürün listeleme ve açıklama yazma
- Stok yönetimi
- Satış analizi
- Müşteri hizmetleri
- Platform kuralları
- SEO optimizasyonu

Profesyonel ve rehberlik edici ol. Türkçe yanıt ver.
""",
            "admin": """
Sen ShopWise'ın admin asistanısın. Yöneticilere platform yönetimi konusunda yardım ediyorsun:
- Sistem yönetimi
- Kullanıcı yönetimi  
- Raporlama
- Platform optimizasyonu

Teknik ve detaylı bilgi ver. Türkçe yanıt ver.
""",
            "guest": """
Sen ShopWise'ın genel asistanısın. Ziyaretçilere platform hakkında bilgi veriyorsun:
- Platform özellikleri
- Kayıt olma süreci
- Genel sorular

Samimi ve bilgilendirici ol. Türkçe yanıt ver.
"""
        }
        
        system_prompt = role_prompts.get(user_role, role_prompts["guest"])
        
        # Gemini'den yanıt al
        response = await gemini_service.generate_chat_response(
            user_message=chat_message.message,
            context=system_prompt + "\n\n" + chat_message.context
        )
        
        # Rol bazlı öneriler
        role_suggestions = {
            "customer": [
                "500 TL altında telefon öner",
                "En çok satan ürünler neler?",
                "Kargo ücreti ne kadar?",
                "İade işlemi nasıl yapılır?"
            ],
            "seller": [
                "Ürün açıklaması nasıl yazılır?",
                "Stok nasıl güncellenir?", 
                "Satış raporlarını nasıl görürüm?",
                "SEO için ipuçları ver"
            ],
            "admin": [
                "Sistem durumu nasıl?",
                "Kullanıcı istatistikleri",
                "Platform performansı",
                "Güvenlik ayarları"
            ],
            "guest": [
                "Nasıl kayıt olabilirim?",
                "Satıcı hesabı açabilir miyim?",
                "Platform özellikleri neler?",
                "Güvenli alışveriş yapabilir miyim?"
            ]
        }
        
        suggestions = role_suggestions.get(user_role, role_suggestions["guest"])
        
        return ChatResponse(
            response=response,
            suggestions=suggestions
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Rol bazlı chatbot yanıtı oluşturulamadı: {str(e)}"
        )

@router.post("/search-assistant")
async def search_assistant(
    query: str
):
    """
    Doğal dil arama sorgusunu analiz eder
    """
    try:
        # Sorguyu analiz et
        search_params = await gemini_service.product_search_query(query)
        
        return {
            "original_query": query,
            "analyzed_params": search_params,
            "message": "Arama parametreleri başarıyla analiz edildi"
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Sorgu analizi yapılamadı: {str(e)}"
        ) 