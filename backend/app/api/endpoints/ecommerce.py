from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
import httpx
import asyncio
import json
import re
from urllib.parse import urlencode
from app.services.gemini_service import GeminiService

router = APIRouter()

class RealECommerceAPI:
    def __init__(self):
        self.dummyjson_url = "https://dummyjson.com"
        self.fakestore_url = "https://fakestoreapi.com"
        self.gemini_service = GeminiService()
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    
    async def translate_description(self, description: str, product_name: str = "") -> str:
        """Ürün açıklamasını Türkçeye çevir - Basit ve etkili"""
        try:
            if not description or len(description.strip()) < 3:
                return "Kaliteli ürün, detaylar için satıcı ile iletişime geçin."
            
            # Önce Gemini AI ile çevir (daha iyi sonuç için)
            try:
                prompt = f"""
Bu ürün açıklamasını doğal ve akıcı Türkçeye çevir. Sadece çeviriyi ver, başka hiçbir şey ekleme:

{description}
"""
                response = await asyncio.wait_for(
                    self.gemini_service.generate_response(prompt), 
                    timeout=5.0
                )
                if response and len(response.strip()) > 10:
                    # Temizle ve döndür
                    clean_response = response.strip()
                    # Gereksiz ön/son ifadeleri temizle
                    if clean_response.startswith('"') and clean_response.endswith('"'):
                        clean_response = clean_response[1:-1]
                    return clean_response
            except asyncio.TimeoutError:
                print("Gemini çeviri timeout, fallback kullanılıyor")
            except Exception as e:
                print(f"Gemini çeviri hatası: {e}, fallback kullanılıyor")
            
            # Fallback: Basit sözlük çevirisi
            simple_translations = {
                "mascara": "maskara",
                "eyeshadow": "göz farı",
                "palette": "palet",
                "mirror": "ayna",
                "powder": "pudra",
                "lipstick": "ruj",
                "foundation": "fondöten",
                "perfume": "parfüm",
                "fragrance": "koku",
                "smartphone": "akıllı telefon",
                "laptop": "dizüstü bilgisayar",
                "tablet": "tablet",
                "headphones": "kulaklık",
                "speaker": "hoparlör",
                "camera": "kamera",
                "watch": "saat",
                "popular": "popüler",
                "premium": "premium",
                "high quality": "yüksek kaliteli",
                "comfortable": "rahat",
                "stylish": "şık",
                "modern": "modern",
                "wireless": "kablosuz",
                "bluetooth": "bluetooth",
                "waterproof": "su geçirmez"
            }
            
            translated = description
            for en, tr in simple_translations.items():
                translated = re.sub(r'\b' + re.escape(en) + r'\b', tr, translated, flags=re.IGNORECASE)
            
            # Eğer hiçbir çeviri yapılmadıysa, genel açıklama ver
            if translated.lower() == description.lower():
                # Ürün kategorisine göre özel açıklama
                if any(word in product_name.lower() for word in ['mascara', 'makeup', 'cosmetic']):
                    return "Kaliteli kozmetik ürünü, uzun süre dayanıklı ve cilde uyumlu formül."
                elif any(word in product_name.lower() for word in ['phone', 'smartphone', 'iphone']):
                    return "Son teknoloji akıllı telefon, yüksek performans ve şık tasarım."
                elif any(word in product_name.lower() for word in ['laptop', 'computer', 'macbook']):
                    return "Güçlü işlemci ve uzun pil ömrü ile profesyonel dizüstü bilgisayar."
                else:
                    return "Kaliteli ürün, hızlı kargo ve güvenli alışveriş garantisi."
            
            return translated.strip()
                
        except Exception as e:
            print(f"Açıklama çeviri hatası: {e}")
            return "Kaliteli ürün, hızlı kargo ve güvenli alışveriş."
    
    async def search_products(self, query: str, limit: int = 20, page: int = 1) -> dict:
        """Gerçek e-ticaret API'lerinden ürün arama"""
        all_products = []
        
        try:
            async with httpx.AsyncClient() as client:
                # 1. DummyJSON API - 194 gerçek ürün
                try:
                    if query.strip():
                        # Arama yap
                        search_url = f"{self.dummyjson_url}/products/search"
                        params = {'q': query, 'limit': limit}
                    else:
                        # Tüm ürünleri getir
                        search_url = f"{self.dummyjson_url}/products"
                        params = {'limit': limit, 'skip': (page - 1) * limit}
                    
                    response = await client.get(search_url, params=params, headers=self.headers, timeout=10.0)
                    
                    if response.status_code == 200:
                        data = response.json()
                        products = data.get('products', [])
                        
                        for item in products:
                            try:
                                # Fiyatı TL'ye çevir (USD * 30)
                                price_usd = item.get('price', 0)
                                price_tl = int(price_usd * 30)
                                
                                # İndirim varsa orijinal fiyatı hesapla
                                discount_percentage = item.get('discountPercentage', 0)
                                original_price_tl = price_tl
                                if discount_percentage > 0:
                                    original_price_tl = int(price_tl / (1 - discount_percentage / 100))
                                
                                # Stok durumu
                                stock = item.get('stock', 0)
                                in_stock = stock > 0
                                availability = item.get('availabilityStatus', 'In Stock')
                                
                                # Kategori Türkçeleştir
                                category_map = {
                                    'smartphones': 'Akıllı Telefonlar',
                                    'laptops': 'Dizüstü Bilgisayarlar', 
                                    'fragrances': 'Parfüm',
                                    'skincare': 'Cilt Bakımı',
                                    'groceries': 'Market',
                                    'home-decoration': 'Ev Dekorasyonu',
                                    'furniture': 'Mobilya',
                                    'tops': 'Üst Giyim',
                                    'womens-dresses': 'Kadın Elbiseleri',
                                    'womens-shoes': 'Kadın Ayakkabıları',
                                    'mens-shirts': 'Erkek Gömlekleri',
                                    'mens-shoes': 'Erkek Ayakkabıları',
                                    'mens-watches': 'Erkek Saatleri',
                                    'womens-watches': 'Kadın Saatleri',
                                    'womens-bags': 'Kadın Çantaları',
                                    'womens-jewellery': 'Kadın Takıları',
                                    'sunglasses': 'Güneş Gözlüğü',
                                    'automotive': 'Otomotiv',
                                    'motorcycle': 'Motosiklet',
                                    'lighting': 'Aydınlatma'
                                }
                                
                                category = category_map.get(item.get('category', ''), item.get('category', 'Genel'))
                                
                                # Açıklamayı Türkçeye çevir
                                original_description = item.get('description', '')
                                turkish_description = await self.translate_description(
                                    original_description, 
                                    item.get('title', '')
                                )
                                
                                product = {
                                    'id': f"dj_{item.get('id', '')}",
                                    'name': item.get('title', ''),
                                    'brand': item.get('brand', 'Marka'),
                                    'price': price_tl,
                                    'originalPrice': original_price_tl,
                                    'rating': round(item.get('rating', 4.0), 1),
                                    'reviews': len(item.get('reviews', [])) * 100,  # Reviews sayısını artır
                                    'image': item.get('thumbnail', ''),
                                    'description': turkish_description,
                                    'features': item.get('tags', [])[:4] or ['Kaliteli', 'Hızlı Kargo', 'İade Garantisi'],
                                    'inStock': in_stock,
                                    'stockCount': stock,
                                    'discount': int(discount_percentage),
                                    'trendScore': min(95, int(70 + (discount_percentage * 1.5))),
                                    'trustScore': min(98, int(85 + item.get('rating', 4.0) * 2)),
                                    'returnRate': max(2, int(15 - item.get('rating', 4.0) * 2)),
                                    'category': category,
                                    'url': f"https://dummyjson.com/products/{item.get('id', '')}"
                                }
                                all_products.append(product)
                                
                            except Exception as e:
                                print(f"DummyJSON ürün parse hatası: {e}")
                                continue
                                
                except Exception as e:
                    print(f"DummyJSON API hatası: {e}")
                
                # 2. FakeStore API - Ek ürünler
                if len(all_products) < limit:
                    try:
                        remaining = limit - len(all_products)
                        fakestore_url = f"{self.fakestore_url}/products"
                        
                        response = await client.get(fakestore_url, headers=self.headers, timeout=10.0)
                        
                        if response.status_code == 200:
                            products = response.json()
                            
                            # Query ile filtrele (basit arama)
                            if query.strip():
                                filtered_products = [
                                    p for p in products 
                                    if query.lower() in p.get('title', '').lower() or 
                                       query.lower() in p.get('category', '').lower()
                                ][:remaining]
                            else:
                                filtered_products = products[:remaining]
                            
                            for item in filtered_products:
                                try:
                                    # Fiyatı TL'ye çevir
                                    price_tl = int(item.get('price', 0) * 30)
                                    
                                    # Kategori Türkçeleştir
                                    category_map = {
                                        "men's clothing": "Erkek Giyim",
                                        "women's clothing": "Kadın Giyim", 
                                        "jewelery": "Takı",
                                        "electronics": "Elektronik"
                                    }
                                    
                                    category = category_map.get(item.get('category', ''), item.get('category', 'Genel'))
                                    
                                    # Açıklamayı Türkçeye çevir
                                    original_description = item.get('description', '')
                                    turkish_description = await self.translate_description(
                                        original_description,
                                        item.get('title', '')
                                    )
                                    
                                    product = {
                                        'id': f"fs_{item.get('id', '')}",
                                        'name': item.get('title', ''),
                                        'brand': category,  # Marka olarak kategori kullan
                                        'price': price_tl,
                                        'originalPrice': int(price_tl * 1.15),  # %15 indirim simülasyonu
                                        'rating': round(item.get('rating', {}).get('rate', 4.0), 1),
                                        'reviews': item.get('rating', {}).get('count', 100),
                                        'image': item.get('image', ''),
                                        'description': turkish_description,
                                        'features': ['Kaliteli', 'Hızlı Kargo', 'İade Garantisi', 'Güvenli Alışveriş'],
                                        'inStock': True,
                                        'stockCount': 25,
                                        'discount': 15,
                                        'trendScore': 85,
                                        'trustScore': 90,
                                        'returnRate': 5,
                                        'category': category,
                                        'url': f"https://fakestoreapi.com/products/{item.get('id', '')}"
                                    }
                                    all_products.append(product)
                                    
                                except Exception as e:
                                    print(f"FakeStore ürün parse hatası: {e}")
                                    continue
                                    
                    except Exception as e:
                        print(f"FakeStore API hatası: {e}")
                
                # Benzersiz ürünleri filtrele (aynı isimdeki ürünleri çıkar)
                seen_names = set()
                unique_products = []
                for product in all_products:
                    name_lower = product['name'].lower().strip()
                    if name_lower not in seen_names:
                        seen_names.add(name_lower)
                        unique_products.append(product)
                
                return {
                    'products': unique_products[:limit],
                    'total': len(unique_products),
                    'page': page,
                    'query': query,
                    'source': 'DummyJSON + FakeStore APIs',
                    'message': f"{len(unique_products[:limit])} benzersiz ürün bulundu"
                }
                    
        except Exception as e:
            print(f"Genel API hatası: {e}")
            return {'products': [], 'total': 0, 'page': page, 'query': query}
    
    async def get_product_details(self, product_id: str) -> dict:
        """Ürün detaylarını getir"""
        try:
            async with httpx.AsyncClient() as client:
                # Ürün detay sayfasını çek
                product_url = f"{self.base_url}/p/{product_id}"
                response = await client.get(product_url, headers=self.headers, timeout=10.0)
                
                if response.status_code == 200:
                    # HTML'i parse et
                    soup = BeautifulSoup(response.content, 'html.parser')
                    
                    # JSON-LD verilerini bul
                    json_scripts = soup.find_all('script', type='application/ld+json')
                    
                    for script in json_scripts:
                        try:
                            data = json.loads(script.string)
                            if data.get('@type') == 'Product':
                                return {
                                    'name': data.get('name', ''),
                                    'description': data.get('description', ''),
                                    'price': data.get('offers', {}).get('price', 0),
                                    'rating': data.get('aggregateRating', {}).get('ratingValue', 0),
                                    'reviewCount': data.get('aggregateRating', {}).get('reviewCount', 0),
                                    'image': data.get('image', ''),
                                    'brand': data.get('brand', {}).get('name', '')
                                }
                        except:
                            continue
                            
        except Exception as e:
            print(f"Ürün detay hatası: {e}")
            
        return {}

# API instance
ecommerce_api = RealECommerceAPI()

@router.get("/search")
async def search_real_products(
    q: str = Query("", description="Arama sorgusu (boş bırakılabilir)"),
    limit: int = Query(20, description="Maksimum ürün sayısı"),
    page: int = Query(1, description="Sayfa numarası")
):
    """Gerçek e-ticaret API'lerinde ürün arama"""
    try:
        result = await ecommerce_api.search_products(q, limit, page)
        
        if not result['products']:
            return {
                "message": "Ürün bulunamadı",
                "products": [],
                "total": 0,
                "query": q
            }
        
        return {
            "message": f"{len(result['products'])} ürün bulundu",
            "products": result['products'],
            "total": result['total'],
            "query": q,
            "page": page
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Arama hatası: {str(e)}")

@router.get("/categories")
async def get_trendyol_categories():
    """Trendyol kategorileri"""
    categories = [
        {"id": 1, "name": "Elektronik", "slug": "elektronik"},
        {"id": 2, "name": "Moda", "slug": "moda"},
        {"id": 3, "name": "Ev & Yaşam", "slug": "ev-yasam"},
        {"id": 4, "name": "Spor & Outdoor", "slug": "spor-outdoor"},
        {"id": 5, "name": "Kozmetik", "slug": "kozmetik"},
        {"id": 6, "name": "Ayakkabı & Çanta", "slug": "ayakkabi-canta"},
        {"id": 7, "name": "Saat & Aksesuar", "slug": "saat-aksesuar"},
        {"id": 8, "name": "Anne & Bebek", "slug": "anne-bebek"},
        {"id": 9, "name": "Kitap", "slug": "kitap"},
        {"id": 10, "name": "Otomotiv", "slug": "otomotiv"}
    ]
    
    return {"categories": categories}

@router.get("/trending")
async def get_trending_products(limit: int = Query(10, description="Maksimum ürün sayısı")):
    """Trend ürünler - Gerçek API'lerden"""
    try:
        # En popüler kategorilerden ürünler getir
        trending_queries = ["phone", "laptop", "shoes", "bag", "watch"]
        all_products = []
        
        for query in trending_queries:
            result = await ecommerce_api.search_products(query, limit=4, page=1)
            all_products.extend(result['products'][:2])  # Her kategoriden 2 ürün
            
            if len(all_products) >= limit:
                break
        
        return {
            "message": f"{len(all_products)} trend ürün bulundu",
            "products": all_products[:limit]
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Trend ürünler getirilemedi: {str(e)}")

@router.get("/product/{product_id}")
async def get_product_detail(product_id: str):
    """Ürün detayı"""
    try:
        details = await trendyol_api.get_product_details(product_id)
        
        if not details:
            raise HTTPException(status_code=404, detail="Ürün bulunamadı")
        
        return {"product": details}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ürün detayı alınamadı: {str(e)}")