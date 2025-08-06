from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from pydantic import BaseModel
import asyncio
from app.services.gemini_service import GeminiService

router = APIRouter()
gemini_service = GeminiService()

class SearchRequest(BaseModel):
    query: str
    category: Optional[str] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    brand: Optional[str] = None

class SearchResponse(BaseModel):
    products: List[dict]
    total_results: int
    source: str
    ai_analysis: bool

class AutocompleteResponse(BaseModel):
    suggestions: List[dict]

@router.get("/autocomplete")
async def get_autocomplete_suggestions(q: str = Query(..., min_length=1)):
    """
    Gerçek zamanlı autocomplete önerileri
    """
    try:
        if len(q) < 2:
            return AutocompleteResponse(suggestions=[])
        
        # AI destekli öneriler
        prompt = f"""
        Kullanıcı "{q}" yazıyor. E-ticaret arama önerileri ver:
        - Fiyat filtreleri (örn: "500 TL altında")
        - Marka önerileri
        - Kategori önerileri
        - Benzer ürünler
        - Trend ürünler
        
        Her öneri için emoji ve tip belirt.
        """
        
        ai_suggestions = await gemini_service.generate_response(prompt)
        
        # Mock öneriler (AI yanıtı başarısız olursa)
        mock_suggestions = [
            {"text": f"{q} en uygun fiyat", "type": "Fiyat Önerisi", "icon": "💰"},
            {"text": f"{q} marka seçenekleri", "type": "Marka", "icon": "🏷️"},
            {"text": f"{q} kategorisi", "type": "Kategori", "icon": "📂"},
            {"text": f"{q} benzer ürünler", "type": "Benzer", "icon": "🔄"},
            {"text": f"{q} en çok satan", "type": "Trend", "icon": "🔥"}
        ]
        
        return AutocompleteResponse(suggestions=mock_suggestions)
        
    except Exception as e:
        print(f"Autocomplete hatası: {e}")
        return AutocompleteResponse(suggestions=[])

@router.post("/natural-language")
async def natural_language_search(request: SearchRequest):
    """
    Doğal dil ile AI destekli arama
    """
    try:
        # AI analizi
        analysis_prompt = f"""
        Kullanıcı sorgusu: "{request.query}"
        
        Bu sorguyu analiz et ve şu bilgileri çıkar:
        1. Ana ürün kategorisi
        2. Fiyat aralığı (varsa)
        3. Marka tercihi (varsa)
        4. Özel özellikler
        
        JSON formatında döndür:
        {{
            "category": "kategori",
            "price_range": {{"min": 0, "max": 1000}},
            "brand": "marka",
            "features": ["özellik1", "özellik2"],
            "search_keywords": ["anahtar1", "anahtar2"]
        }}
        """
        
        ai_analysis = await gemini_service.generate_response(analysis_prompt)
        
        # Mock ürün sonuçları (gerçek uygulamada veritabanından çekilir)
        mock_products = generate_mock_products(request.query, ai_analysis)
        
        return SearchResponse(
            products=mock_products,
            total_results=len(mock_products),
            source="Gemini AI Analizi",
            ai_analysis=True
        )
        
    except Exception as e:
        print(f"Doğal dil arama hatası: {e}")
        # Fallback
        mock_products = generate_mock_products(request.query, None)
        return SearchResponse(
            products=mock_products,
            total_results=len(mock_products),
            source="Standart Arama",
            ai_analysis=False
        )

def generate_mock_products(query: str, ai_analysis: str = None):
    """
    Sorguya göre mock ürünler oluştur
    """
    query_lower = query.lower()
    
    # Kategori bazlı ürünler
    categories = {
        'telefon': [
            {
                "id": 1,
                "name": "iPhone 15 Pro",
                "price": 45000,
                "originalPrice": 50000,
                "brand": "Apple",
                "rating": 4.8,
                "reviews": 1250,
                "image": "https://via.placeholder.com/300x300?text=iPhone+15+Pro",
                "description": "A17 Pro çip ile güçlendirilmiş, 48MP kamera sistemi",
                "category": "Telefon",
                "inStock": True,
                "stockCount": 25,
                "discount": 10
            },
            {
                "id": 2,
                "name": "Samsung Galaxy S24",
                "price": 38000,
                "originalPrice": 42000,
                "brand": "Samsung",
                "rating": 4.7,
                "reviews": 980,
                "image": "https://via.placeholder.com/300x300?text=Galaxy+S24",
                "description": "AI destekli kamera sistemi, uzun pil ömrü",
                "category": "Telefon",
                "inStock": True,
                "stockCount": 18,
                "discount": 9
            }
        ],
        'ayakkabı': [
            {
                "id": 3,
                "name": "Nike Air Max",
                "price": 1200,
                "originalPrice": 1500,
                "brand": "Nike",
                "rating": 4.5,
                "reviews": 650,
                "image": "https://via.placeholder.com/300x300?text=Nike+Air+Max",
                "description": "Maksimum konfor ve stil için tasarlanmış",
                "category": "Ayakkabı",
                "inStock": True,
                "stockCount": 42,
                "discount": 20
            },
            {
                "id": 4,
                "name": "Adidas Ultraboost",
                "price": 1500,
                "originalPrice": 1800,
                "brand": "Adidas",
                "rating": 4.6,
                "reviews": 720,
                "image": "https://via.placeholder.com/300x300?text=Adidas+Ultraboost",
                "description": "Boost teknolojisi ile üstün performans",
                "category": "Ayakkabı",
                "inStock": True,
                "stockCount": 35,
                "discount": 17
            }
        ],
        'laptop': [
            {
                "id": 5,
                "name": "MacBook Pro M3",
                "price": 65000,
                "originalPrice": 70000,
                "brand": "Apple",
                "rating": 4.9,
                "reviews": 890,
                "image": "https://via.placeholder.com/300x300?text=MacBook+Pro+M3",
                "description": "M3 çip ile güçlendirilmiş profesyonel laptop",
                "category": "Bilgisayar",
                "inStock": True,
                "stockCount": 12,
                "discount": 7
            },
            {
                "id": 6,
                "name": "Dell XPS 13",
                "price": 45000,
                "originalPrice": 48000,
                "brand": "Dell",
                "rating": 4.7,
                "reviews": 540,
                "image": "https://via.placeholder.com/300x300?text=Dell+XPS+13",
                "description": "Ultrabook deneyimi, uzun pil ömrü",
                "category": "Bilgisayar",
                "inStock": True,
                "stockCount": 8,
                "discount": 6
            }
        ]
    }
    
    # Sorguya göre kategori seç
    if any(word in query_lower for word in ['telefon', 'phone', 'iphone', 'samsung']):
        return categories['telefon']
    elif any(word in query_lower for word in ['ayakkabı', 'shoe', 'nike', 'adidas']):
        return categories['ayakkabı']
    elif any(word in query_lower for word in ['laptop', 'bilgisayar', 'macbook', 'dell']):
        return categories['laptop']
    else:
        # Karışık sonuçlar
        all_products = []
        for category_products in categories.values():
            all_products.extend(category_products)
        return all_products[:6]  # İlk 6 ürün 