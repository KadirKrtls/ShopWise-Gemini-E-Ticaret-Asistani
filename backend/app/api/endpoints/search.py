from fastapi import APIRouter, HTTPException, Depends, Query
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from app.services.gemini_service import gemini_service
from app.models.database import get_db, Product
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_

router = APIRouter()

class SearchRequest(BaseModel):
    query: str
    category: Optional[str] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    brand: Optional[str] = None

class SearchResponse(BaseModel):
    query: str
    total_results: int
    products: List[Dict[str, Any]]
    search_params: Dict[str, Any]

@router.post("/natural-language", response_model=SearchResponse)
async def natural_language_search(
    search_request: SearchRequest,
    db: Session = Depends(get_db)
):
    """
    Doğal dil arama sorgusu
    """
    try:
        # Gemini ile sorguyu analiz et
        search_params = await gemini_service.product_search_query(search_request.query)
        
        # Veritabanında arama yap
        query = db.query(Product)
        
        # Kategori filtresi
        if search_params.get("category"):
            query = query.filter(Product.category.ilike(f"%{search_params['category']}%"))
        
        # Marka filtresi
        if search_params.get("brand"):
            query = query.filter(Product.brand.ilike(f"%{search_params['brand']}%"))
        
        # Fiyat aralığı
        if search_params.get("price_range", {}).get("min"):
            query = query.filter(Product.price >= search_params["price_range"]["min"])
        
        if search_params.get("price_range", {}).get("max"):
            query = query.filter(Product.price <= search_params["price_range"]["max"])
        
        # Ürün adında arama
        if search_request.query:
            query = query.filter(
                or_(
                    Product.name.ilike(f"%{search_request.query}%"),
                    Product.description.ilike(f"%{search_request.query}%")
                )
            )
        
        products = query.limit(20).all()
        
        # Sonuçları formatla
        products_data = []
        for product in products:
            products_data.append({
                "id": product.id,
                "name": product.name,
                "description": product.description,
                "price": product.price,
                "category": product.category,
                "brand": product.brand,
                "stock": product.stock
            })
        
        return SearchResponse(
            query=search_request.query,
            total_results=len(products_data),
            products=products_data,
            search_params=search_params
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Arama yapılamadı: {str(e)}"
        )

@router.get("/suggestions")
async def get_search_suggestions(
    q: str = Query(..., min_length=2),
    db: Session = Depends(get_db)
):
    """
    Arama önerileri
    """
    try:
        # Ürün adlarında arama yap
        products = db.query(Product.name).filter(
            Product.name.ilike(f"%{q}%")
        ).limit(10).all()
        
        suggestions = [product.name for product in products]
        
        # Kategori önerileri
        categories = db.query(Product.category).filter(
            Product.category.ilike(f"%{q}%")
        ).distinct().limit(5).all()
        
        category_suggestions = [cat.category for cat in categories]
        
        return {
            "query": q,
            "product_suggestions": suggestions,
            "category_suggestions": category_suggestions,
            "total_suggestions": len(suggestions) + len(category_suggestions)
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Öneriler alınamadı: {str(e)}"
        )

@router.get("/trending")
async def get_trending_products(
    db: Session = Depends(get_db)
):
    """
    Trend ürünler
    """
    try:
        # Demo için sabit trend ürünler
        trending_products = [
            {
                "id": 1,
                "name": "Nike Air Max 270",
                "category": "Spor Ayakkabı",
                "price": 899.99,
                "trend_score": 95
            },
            {
                "id": 2,
                "name": "iPhone 15 Pro",
                "category": "Telefon",
                "price": 45999.99,
                "trend_score": 92
            },
            {
                "id": 3,
                "name": "Samsung Galaxy S24",
                "category": "Telefon",
                "price": 32999.99,
                "trend_score": 88
            }
        ]
        
        return {
            "trending_products": trending_products,
            "total_trending": len(trending_products)
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Trend ürünler alınamadı: {str(e)}"
        )

@router.get("/categories")
async def get_categories(
    db: Session = Depends(get_db)
):
    """
    Mevcut kategorileri listele
    """
    try:
        categories = db.query(Product.category).distinct().all()
        
        return {
            "categories": [cat.category for cat in categories],
            "total_categories": len(categories)
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Kategoriler alınamadı: {str(e)}"
        ) 