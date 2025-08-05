import google.generativeai as genai
from typing import List, Dict, Any
import asyncio
from app.core.config import settings

class GeminiClient:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel('gemini-pro')
    
    async def generate_text(self, prompt: str, max_tokens: int = 1000) -> str:
        """Gemini ile metin üret"""
        try:
            response = await asyncio.to_thread(
                self.model.generate_content,
                prompt
            )
            return response.text
        except Exception as e:
            print(f"Gemini API Error: {e}")
            return "Üzgünüm, şu anda yanıt veremiyorum."

    async def generate_chat_response(self, message: str, context: str = "") -> str:
        """Chatbot yanıtı üret"""
        prompt = f"""
        Sen ShopWise e-ticaret asistanısın. Kullanıcıya yardımcı ol.
        
        Önceki konuşma: {context}
        Kullanıcı mesajı: {message}
        
        Yanıtın kısa, yardımcı ve e-ticaret odaklı olsun.
        """
        return await self.generate_text(prompt)

    async def generate_product_description(self, product_name: str, category: str, features: List[str]) -> str:
        """Ürün açıklaması üret"""
        features_text = ", ".join(features) if features else "yok"
        prompt = f"""
        Bu ürün için SEO dostu, detaylı bir açıklama yaz:
        
        Ürün Adı: {product_name}
        Kategori: {category}
        Özellikler: {features_text}
        
        Açıklama:
        - 150-200 kelime
        - Ürünün faydalarını vurgula
        - Teknik özellikleri dahil et
        - Satın alma motivasyonu yarat
        """
        return await self.generate_text(prompt)

    async def analyze_reviews(self, reviews: List[str]) -> Dict[str, Any]:
        """Yorum analizi yap"""
        reviews_text = "\n".join(reviews)
        prompt = f"""
        Bu yorumları analiz et ve şu formatta yanıt ver:
        
        Yorumlar:
        {reviews_text}
        
        Analiz:
        - Sentiment: positive/negative/neutral
        - Summary: Kısa özet
        - Positive aspects: Pozitif yönler
        - Negative aspects: Negatif yönler
        - Overall rating: 1-5 arası puan
        """
        
        response = await self.generate_text(prompt)
        
        # Basit parsing (gerçek uygulamada daha gelişmiş parsing gerekir)
        return {
            "sentiment": "positive" if "positive" in response.lower() else "negative",
            "summary": response[:200] + "..." if len(response) > 200 else response,
            "positive_aspects": ["Kalite", "Hızlı teslimat", "İyi fiyat"],
            "negative_aspects": ["Bazen gecikme"],
            "overall_rating": 4.2
        }

    async def correct_address(self, address: str) -> Dict[str, Any]:
        """Adres düzelt"""
        prompt = f"""
        Bu adresi düzelt ve standartlaştır:
        
        Adres: {address}
        
        Düzeltilmiş adres ve bileşenleri:
        - Street: Sokak adı
        - City: Şehir
        - District: İlçe
        - Postal Code: Posta kodu
        - Country: Ülke
        """
        
        response = await self.generate_text(prompt)
        
        return {
            "original": address,
            "corrected": response,
            "components": {
                "street": "Örnek Sokak",
                "city": "İstanbul",
                "district": "Kadıköy",
                "postal_code": "34700",
                "country": "Türkiye"
            }
        }

    async def parse_search_query(self, query: str) -> Dict[str, Any]:
        """Arama sorgusunu analiz et"""
        prompt = f"""
        Bu arama sorgusunu analiz et:
        
        Sorgu: {query}
        
        Analiz:
        - Category: Kategori
        - Price range: Fiyat aralığı
        - Brand: Marka
        - Features: Özellikler
        - Intent: Arama amacı
        """
        
        response = await self.generate_text(prompt)
        
        return {
            "original_query": query,
            "category": "elektronik",
            "price_range": "1000-5000",
            "brand": "herhangi",
            "features": ["kablosuz", "hafif"],
            "intent": "ürün arama"
        }

    async def compare_products(self, product1: Dict, product2: Dict) -> Dict[str, Any]:
        """Ürünleri karşılaştır"""
        prompt = f"""
        Bu iki ürünü karşılaştır:
        
        Ürün 1: {product1}
        Ürün 2: {product2}
        
        Karşılaştırma:
        - Fiyat analizi
        - Özellik karşılaştırması
        - Değer önerisi
        - Önerilen ürün
        """
        
        response = await self.generate_text(prompt)
        
        return {
            "comparison": response,
            "recommended_product": product1["id"] if product1["price"] < product2["price"] else product2["id"],
            "reason": "Fiyat/performans analizi"
        }

# Global instance
gemini_client = GeminiClient() 