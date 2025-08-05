# 🔑 API Kurulum Kılavuzu

## 1. Google Gemini API (Zorunlu)

### Adım 1: Google AI Studio'ya Gidin
- URL: https://makersuite.google.com/app/apikey
- Google hesabınızla giriş yapın

### Adım 2: API Key Oluşturun
1. "Create API Key" butonuna tıklayın
2. API key'inizi kopyalayın
3. Güvenli bir yerde saklayın

### Adım 3: Projeye Ekleyin
```bash
# .env dosyasını düzenleyin
echo "GEMINI_API_KEY=your_api_key_here" >> .env
```

### Adım 4: Test Edin
```bash
# Backend'i başlatın
docker-compose up backend

# API'yi test edin
curl -X POST "http://localhost:8000/api/v1/chatbot/chat" \
  -H "Content-Type: application/json" \
  -d '{"message": "Merhaba"}'
```

## 2. Google Maps API (Opsiyonel)

### Adım 1: Google Cloud Console'a Gidin
- URL: https://console.cloud.google.com/
- Google hesabınızla giriş yapın

### Adım 2: Proje Oluşturun
1. "Select a project" > "New Project"
2. Proje adı: "ShopWise"
3. "Create" butonuna tıklayın

### Adım 3: API'yi Etkinleştirin
1. "APIs & Services" > "Library"
2. "Maps JavaScript API" arayın
3. "Enable" butonuna tıklayın

### Adım 4: API Key Oluşturun
1. "APIs & Services" > "Credentials"
2. "Create Credentials" > "API Key"
3. API key'inizi kopyalayın

### Adım 5: Projeye Ekleyin
```bash
# .env dosyasına ekleyin
echo "GOOGLE_MAPS_API_KEY=your_maps_api_key_here" >> .env
```

## 3. Environment Variables

### .env Dosyası Örneği
```bash
# Gemini API (Zorunlu)
GEMINI_API_KEY=AIzaSyC...your_gemini_api_key_here

# Google Maps API (Opsiyonel)
GOOGLE_MAPS_API_KEY=AIzaSyC...your_maps_api_key_here

# Database
DATABASE_URL=postgresql://shopwise:shopwise123@localhost:5432/shopwise

# Security
SECRET_KEY=your-secret-key-here-change-this-in-production
```

## 4. API Test Komutları

### Gemini API Test
```bash
# Chatbot test
curl -X POST "http://localhost:8000/api/v1/chatbot/chat" \
  -H "Content-Type: application/json" \
  -d '{"message": "500 TL altında spor ayakkabı öner"}'

# Ürün açıklaması test
curl -X POST "http://localhost:8000/api/v1/products/generate-description" \
  -H "Content-Type: application/json" \
  -d '{
    "product_name": "Nike Air Max 270",
    "category": "Spor Ayakkabı",
    "features": ["Su geçirmez", "Hafif", "Dayanıklı"]
  }'
```

### Yorum Analizi Test
```bash
curl -X POST "http://localhost:8000/api/v1/reviews/analyze-bulk" \
  -H "Content-Type: application/json" \
  -d '[
    "Bu ürün gerçekten harika! Kalitesi çok iyi.",
    "Fiyatı biraz yüksek ama değer.",
    "Hızlı teslimat, memnun kaldım."
  ]'
```

### Adres Düzeltme Test
```bash
curl -X POST "http://localhost:8000/api/v1/addresses/correct" \
  -H "Content-Type: application/json" \
  -d '{"address": "istanbul kadikoy moda cad no 15 kat 2"}'
```

## 5. API Quota ve Limitler

### Gemini API
- **Ücretsiz Tier**: 15 requests/minute
- **Ücretli Tier**: $0.0005 / 1K characters
- **Model**: gemini-pro

### Google Maps API
- **Ücretsiz Tier**: $200 kredi/ay
- **Maps JavaScript API**: $7 per 1000 requests
- **Geocoding API**: $5 per 1000 requests

## 6. Sorun Giderme

### Gemini API Hatası
```bash
# API key kontrolü
echo $GEMINI_API_KEY

# Backend logları
docker-compose logs backend
```

### Maps API Hatası
```bash
# API key kontrolü
echo $GOOGLE_MAPS_API_KEY

# CORS hatası için
# Frontend'de proxy ayarlarını kontrol edin
```

## 7. Production Deployment

### Environment Variables
```bash
# Production .env
GEMINI_API_KEY=your_production_gemini_key
GOOGLE_MAPS_API_KEY=your_production_maps_key
DATABASE_URL=postgresql://user:pass@host:port/db
SECRET_KEY=your_production_secret_key
```

### Docker Deployment
```bash
# Production build
docker-compose -f docker-compose.prod.yml up -d

# Environment variables
export GEMINI_API_KEY=your_production_key
export GOOGLE_MAPS_API_KEY=your_production_maps_key
```

## 8. Güvenlik Notları

1. **API Key'leri asla commit etmeyin**
2. **Production'da güçlü secret key kullanın**
3. **API key'leri düzenli olarak rotate edin**
4. **Quota limitlerini takip edin**

---

**🎯 Özet:**
- **Zorunlu**: Google Gemini API
- **Opsiyonel**: Google Maps API
- **Test**: Yukarıdaki curl komutları ile
- **Deployment**: Docker ile kolay deployment 