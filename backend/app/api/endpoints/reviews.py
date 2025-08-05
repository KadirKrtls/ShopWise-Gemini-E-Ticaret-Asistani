from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Dict, Any
from app.services.gemini_service import gemini_service
from app.models.database import get_db, Review
from sqlalchemy.orm import Session

router = APIRouter()

class ReviewCreate(BaseModel):
    product_id: int
    user_id: int
    rating: int
    comment: str

class ReviewAnalysis(BaseModel):
    summary: str
    positive_aspects: List[str]
    negative_aspects: List[str]
    overall_sentiment: str
    rating_estimate: float

class ReviewAnalysisResponse(BaseModel):
    product_id: int
    total_reviews: int
    average_rating: float
    analysis: ReviewAnalysis

@router.post("/analyze/{product_id}")
async def analyze_product_reviews(
    product_id: int,
    db: Session = Depends(get_db)
):
    """
    Ürün yorumlarını Gemini ile analiz et
    """
    try:
        # Ürünün yorumlarını getir
        reviews = db.query(Review).filter(Review.product_id == product_id).all()
        
        if not reviews:
            raise HTTPException(
                status_code=404,
                detail="Bu ürün için yorum bulunamadı"
            )
        
        # Yorum metinlerini topla
        review_texts = [review.comment for review in reviews if review.comment]
        
        if not review_texts:
            raise HTTPException(
                status_code=400,
                detail="Analiz edilecek yorum metni bulunamadı"
            )
        
        # Gemini ile analiz yap
        analysis_result = await gemini_service.analyze_reviews(review_texts)
        
        # Ortalama rating hesapla
        avg_rating = sum(review.rating for review in reviews) / len(reviews)
        
        return ReviewAnalysisResponse(
            product_id=product_id,
            total_reviews=len(reviews),
            average_rating=round(avg_rating, 2),
            analysis=ReviewAnalysis(**analysis_result)
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Yorum analizi yapılamadı: {str(e)}"
        )

@router.post("/analyze-bulk")
async def analyze_multiple_reviews(
    reviews: List[str]
):
    """
    Birden fazla yorumu toplu olarak analiz et
    """
    try:
        if not reviews:
            raise HTTPException(
                status_code=400,
                detail="Analiz edilecek yorum bulunamadı"
            )
        
        # Gemini ile analiz yap
        analysis_result = await gemini_service.analyze_reviews(reviews)
        
        return {
            "total_reviews": len(reviews),
            "analysis": analysis_result,
            "message": "Yorum analizi başarıyla tamamlandı"
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Toplu yorum analizi yapılamadı: {str(e)}"
        )

@router.get("/{product_id}/summary")
async def get_review_summary(
    product_id: int,
    db: Session = Depends(get_db)
):
    """
    Ürün yorumlarının özetini getir
    """
    try:
        reviews = db.query(Review).filter(Review.product_id == product_id).all()
        
        if not reviews:
            return {
                "product_id": product_id,
                "total_reviews": 0,
                "average_rating": 0,
                "summary": "Bu ürün için henüz yorum bulunmuyor."
            }
        
        # Basit istatistikler
        total_reviews = len(reviews)
        avg_rating = sum(review.rating for review in reviews) / total_reviews
        
        # Rating dağılımı
        rating_distribution = {}
        for i in range(1, 6):
            rating_distribution[i] = len([r for r in reviews if r.rating == i])
        
        return {
            "product_id": product_id,
            "total_reviews": total_reviews,
            "average_rating": round(avg_rating, 2),
            "rating_distribution": rating_distribution,
            "message": "Yorum özeti başarıyla oluşturuldu"
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Yorum özeti oluşturulamadı: {str(e)}"
        ) 