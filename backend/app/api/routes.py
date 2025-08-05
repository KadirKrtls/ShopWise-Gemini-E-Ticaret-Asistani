from fastapi import APIRouter
from app.api.endpoints import chatbot, products, reviews, addresses, search

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(chatbot.router, prefix="/chatbot", tags=["chatbot"])
api_router.include_router(products.router, prefix="/products", tags=["products"])
api_router.include_router(reviews.router, prefix="/reviews", tags=["reviews"])
api_router.include_router(addresses.router, prefix="/addresses", tags=["addresses"])
api_router.include_router(search.router, prefix="/search", tags=["search"]) 