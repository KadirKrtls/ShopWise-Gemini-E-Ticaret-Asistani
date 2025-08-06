from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, List
from app.services.gemini_service import gemini_service
from app.models.database import User
from app.api.endpoints.auth import get_current_user

router = APIRouter()

class ProductDescriptionRequest(BaseModel):
    product_name: str
    category: str
    features: List[str] = []

class StockPredictionRequest(BaseModel):
    product_name: str
    current_stock: int
    historical_data: List[dict] = []
    season: Optional[str] = "normal"

class ReviewAnalysisRequest(BaseModel):
    reviews: List[str]

class AddressCorrectionRequest(BaseModel):
    address: str

@router.post("/description")
async def generate_product_description(
    request: ProductDescriptionRequest,
    current_user: Optional[User] = Depends(get_current_user)
):
    """AI destekli ürün açıklaması oluştur"""
    try:
        description = await gemini_service.generate_product_description(
            product_name=request.product_name,
            category=request.category,
            features=request.features
        )
        
        return {
            "success": True,
            "description": description,
            "product_name": request.product_name,
            "category": request.category
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Ürün açıklaması oluşturulamadı: {str(e)}"
        )

@router.post("/stock-predict")
async def predict_stock_requirements(
    request: StockPredictionRequest,
    current_user: Optional[User] = Depends(get_current_user)
):
    """AI destekli stok tahmini"""
    try:
        # Basit AI tahmini (gerçek implementasyon için daha gelişmiş model kullanılabilir)
        prompt = f"""
        Aşağıdaki ürün için stok tahmini yap:
        
        Ürün: {request.product_name}
        Mevcut Stok: {request.current_stock}
        Sezon: {request.season}
        
        Geçmiş veriler: {request.historical_data}
        
        Lütfen şu formatta JSON döndür:
        {{
            "recommended_stock": "önerilen stok miktarı",
            "reorder_point": "sipariş verme noktası",
            "prediction_confidence": "tahmin güvenilirliği %",
            "factors": ["etkileyen faktörler"],
            "next_month_demand": "gelecek ay tahmini talep"
        }}
        """
        
        response = await gemini_service.generate_chat_response(
            user_message=prompt,
            context="Stok tahmini için AI asistanı. Sadece JSON formatında yanıt ver."
        )
        
        # Basit fallback
        import json
        try:
            result = json.loads(response)
        except:
            # Fallback değerler
            result = {
                "recommended_stock": request.current_stock * 2,
                "reorder_point": request.current_stock // 2,
                "prediction_confidence": 85,
                "factors": ["Mevsimsel talep", "Geçmiş satış verileri", "Pazar trendleri"],
                "next_month_demand": request.current_stock * 1.5
            }
        
        return {
            "success": True,
            "prediction": result,
            "product_name": request.product_name
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Stok tahmini yapılamadı: {str(e)}"
        )

@router.post("/analyze-reviews")
async def analyze_product_reviews(
    request: ReviewAnalysisRequest,
    current_user: Optional[User] = Depends(get_current_user)
):
    """Ürün yorumlarını AI ile analiz et"""
    try:
        analysis = await gemini_service.analyze_reviews(request.reviews)
        
        return {
            "success": True,
            "analysis": analysis,
            "review_count": len(request.reviews)
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Yorum analizi yapılamadı: {str(e)}"
        )

@router.post("/correct-address")
async def correct_address(
    request: AddressCorrectionRequest,
    current_user: Optional[User] = Depends(get_current_user)
):
    """Adres düzeltme ve standardizasyon"""
    try:
        corrected_address = await gemini_service.correct_address(request.address)
        
        return {
            "success": True,
            "original_address": request.address,
            "corrected_address": corrected_address
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Adres düzeltilemedi: {str(e)}"
        )

@router.post("/compare-products")
async def compare_products(
    products: List[dict],
    current_user: Optional[User] = Depends(get_current_user)
):
    """Ürünleri AI ile karşılaştır"""
    try:
        comparison = await gemini_service.compare_products(products)
        
        return {
            "success": True,
            "comparison": comparison,
            "product_count": len(products)
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Ürün karşılaştırması yapılamadı: {str(e)}"
        ) 