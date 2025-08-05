from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
from app.services.gemini_service import gemini_service
from app.models.database import get_db, Address
from sqlalchemy.orm import Session

router = APIRouter()

class AddressRequest(BaseModel):
    address: str

class AddressResponse(BaseModel):
    original_address: str
    corrected_address: str
    components: dict

@router.post("/correct", response_model=AddressResponse)
async def correct_address(
    address_request: AddressRequest
):
    """
    Gemini ile adres düzeltme ve standardizasyon
    """
    try:
        # Gemini ile adres düzelt
        corrected_address = await gemini_service.correct_address(address_request.address)
        
        # Adres bileşenlerini parse et (basit demo)
        components = {
            "street": "Sokak/Cadde",
            "neighborhood": "Mahalle",
            "district": "İlçe",
            "city": "Şehir",
            "postal_code": "Posta Kodu",
            "country": "Türkiye"
        }
        
        return AddressResponse(
            original_address=address_request.address,
            corrected_address=corrected_address,
            components=components
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Adres düzeltilemedi: {str(e)}"
        )

@router.post("/validate")
async def validate_address(
    address_request: AddressRequest
):
    """
    Adres doğrulama
    """
    try:
        # Gemini ile adres doğrula
        corrected_address = await gemini_service.correct_address(address_request.address)
        
        # Basit doğrulama (demo)
        is_valid = len(corrected_address) > 10
        
        return {
            "original_address": address_request.address,
            "corrected_address": corrected_address,
            "is_valid": is_valid,
            "message": "Adres doğrulama tamamlandı"
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Adres doğrulama yapılamadı: {str(e)}"
        )

@router.post("/format")
async def format_address(
    address_request: AddressRequest
):
    """
    Adres formatını standardize et
    """
    try:
        # Gemini ile adres formatla
        formatted_address = await gemini_service.correct_address(address_request.address)
        
        return {
            "original_address": address_request.address,
            "formatted_address": formatted_address,
            "format_type": "standard",
            "message": "Adres formatı standardize edildi"
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Adres formatı düzenlenemedi: {str(e)}"
        ) 