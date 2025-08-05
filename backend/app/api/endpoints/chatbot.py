from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, List
from app.services.gemini_service import gemini_service
from app.models.database import get_db
from sqlalchemy.orm import Session

router = APIRouter()

class ChatMessage(BaseModel):
    message: str
    context: Optional[str] = ""

class ChatResponse(BaseModel):
    response: str
    suggestions: List[str] = []

@router.post("/chat", response_model=ChatResponse)
async def chat_with_assistant(
    chat_message: ChatMessage,
    db: Session = Depends(get_db)
):
    """
    Gemini destekli chatbot ile konuşma
    """
    try:
        # Gemini'den yanıt al
        response = await gemini_service.generate_chat_response(
            user_message=chat_message.message,
            context=chat_message.context
        )
        
        # Öneriler oluştur
        suggestions = [
            "500 TL altında spor ayakkabı öner",
            "En popüler ürünler neler?",
            "Kampanyalar hakkında bilgi ver",
            "Teslimat süreleri nedir?"
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

@router.post("/search-assistant")
async def search_assistant(
    query: str,
    db: Session = Depends(get_db)
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