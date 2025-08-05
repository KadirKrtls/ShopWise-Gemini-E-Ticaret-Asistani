import google.generativeai as genai
from typing import List, Dict, Any
from app.core.config import settings
import json

# Configure Gemini
genai.configure(api_key=settings.GEMINI_API_KEY)

class GeminiService:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-pro')
    
    async def generate_product_description(self, product_name: str, category: str, features: List[str]) -> str:
        """Ürün açıklaması üretir"""
        prompt = f"""
        Aşağıdaki ürün için SEO uyumlu, etkileyici bir ürün açıklaması yaz:
        
        Ürün Adı: {product_name}
        Kategori: {category}
        Özellikler: {', '.join(features)}
        
        Açıklama şu özelliklere sahip olmalı:
        - 150-200 kelime
        - SEO uyumlu
        - Müşteriyi ikna edici
        - Ürünün faydalarını vurgulayan
        - Türkçe dilinde
        """
        
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            return f"Ürün açıklaması oluşturulamadı: {str(e)}"
    
    async def analyze_reviews(self, reviews: List[str]) -> Dict[str, Any]:
        """Kullanıcı yorumlarını analiz eder ve özetler"""
        reviews_text = "\n".join(reviews)
        prompt = f"""
        Aşağıdaki ürün yorumlarını analiz et ve şu bilgileri ver:
        
        Yorumlar:
        {reviews_text}
        
        Lütfen şu formatta JSON döndür:
        {{
            "summary": "Genel özet",
            "positive_aspects": ["olumlu yönler listesi"],
            "negative_aspects": ["olumsuz yönler listesi"],
            "overall_sentiment": "positive/negative/neutral",
            "rating_estimate": 1-5 arası tahmini puan
        }}
        """
        
        try:
            response = self.model.generate_content(prompt)
            return json.loads(response.text)
        except Exception as e:
            return {
                "summary": "Yorum analizi yapılamadı",
                "positive_aspects": [],
                "negative_aspects": [],
                "overall_sentiment": "neutral",
                "rating_estimate": 3
            }
    
    async def correct_address(self, address: str) -> str:
        """Adres düzeltme ve standardizasyon"""
        prompt = f"""
        Aşağıdaki adresi düzelt ve standart formata getir:
        
        Orijinal Adres: {address}
        
        Lütfen şu formatta döndür:
        - Sokak/Cadde adı
        - Mahalle
        - İlçe
        - Şehir
        - Posta kodu
        - Ülke
        
        Eksik bilgileri tahmin et ve standart format kullan.
        """
        
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            return f"Adres düzeltilemedi: {str(e)}"
    
    async def product_search_query(self, user_query: str) -> Dict[str, Any]:
        """Doğal dil arama sorgusunu analiz eder"""
        prompt = f"""
        Aşağıdaki kullanıcı sorgusunu analiz et ve ürün arama parametrelerini çıkar:
        
        Kullanıcı Sorgusu: {user_query}
        
        Lütfen şu formatta JSON döndür:
        {{
            "category": "kategori",
            "brand": "marka (varsa)",
            "price_range": {{
                "min": 0,
                "max": null
            }},
            "features": ["özellikler"],
            "color": "renk (varsa)",
            "size": "beden (varsa)"
        }}
        """
        
        try:
            response = self.model.generate_content(prompt)
            return json.loads(response.text)
        except Exception as e:
            return {
                "category": "",
                "brand": "",
                "price_range": {"min": 0, "max": None},
                "features": [],
                "color": "",
                "size": ""
            }
    
    async def compare_products(self, products: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Ürünleri karşılaştırır ve öneriler sunar"""
        products_info = "\n".join([
            f"Ürün {i+1}: {p.get('name', '')} - {p.get('price', 0)} TL - {p.get('rating', 0)}/5"
            for i, p in enumerate(products)
        ])
        
        prompt = f"""
        Aşağıdaki ürünleri karşılaştır ve en iyi seçenekleri öner:
        
        Ürünler:
        {products_info}
        
        Lütfen şu formatta JSON döndür:
        {{
            "best_value": "en iyi değer ürünü",
            "best_quality": "en kaliteli ürün",
            "recommendations": ["öneriler"],
            "comparison_summary": "karşılaştırma özeti"
        }}
        """
        
        try:
            response = self.model.generate_content(prompt)
            return json.loads(response.text)
        except Exception as e:
            return {
                "best_value": "",
                "best_quality": "",
                "recommendations": [],
                "comparison_summary": "Karşılaştırma yapılamadı"
            }
    
    async def generate_chat_response(self, user_message: str, context: str = "") -> str:
        """Chatbot yanıtı üretir"""
        prompt = f"""
        Sen ShopWise e-ticaret asistanısın. Kullanıcıya yardımcı ol.
        
        Kullanıcı Mesajı: {user_message}
        Önceki Konuşma: {context}
        
        Yanıtın:
        - Yardımcı ve dostane olsun
        - Ürün önerileri sun
        - Fiyat bilgisi ver
        - Kampanyalar hakkında bilgi ver
        - Türkçe yanıt ver
        """
        
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            return "Üzgünüm, şu anda size yardımcı olamıyorum. Lütfen daha sonra tekrar deneyin."

# Global instance
gemini_service = GeminiService() 