# 🎬 ShopWise Demo Rehberi

Bu rehber, ShopWise platformunun demo sunumunu yaparken takip edebileceğiniz adımları içerir.

## 🚀 Demo Başlangıcı

### 1. Sistem Durumu Kontrolü
- Backend: http://localhost:8000/health ✅
- Frontend: http://localhost:3000 ✅
- Database: SQLite bağlantısı ✅
- Gemini AI: API anahtarı aktif ✅

### 2. Test Kullanıcıları
```
👤 Müşteri: customer@test.com / 123456
🏪 Satıcı: seller@test.com / 123456
```

## 🎯 Demo Senaryoları

### Senaryo 1: Müşteri Deneyimi (5-7 dakika)

#### 1.1 Ana Sayfa ve Ürün Keşfi
- **Adım**: Ana sayfaya git
- **Göster**: Öne çıkan ürünler, trend ürünler
- **Vurgula**: Responsive tasarım, modern UI

#### 1.2 AI Chatbot Demo
- **Adım**: Sağ alt köşedeki chatbot'u aç
- **Test Soruları**:
  ```
  "Merhaba, nasılsın?"
  "500 TL altında telefon öner"
  "Spor ayakkabı kampanyaları var mı?"
  "iPhone 15 ile Samsung S24 karşılaştır"
  ```
- **Vurgula**: Doğal dil anlama, Türkçe yanıtlar

#### 1.3 Ürün Detay ve Sepet
- **Adım**: Bir ürün seç ve detaylarına git
- **Göster**: Ürün bilgileri, yorumlar, sepete ekleme
- **Vurgula**: Kullanıcı dostu arayüz

### Senaryo 2: Satıcı Deneyimi (5-7 dakika)

#### 2.1 Satıcı Girişi
- **Adım**: seller@test.com ile giriş yap
- **Göster**: Role-based authentication

#### 2.2 AI Ürün Açıklaması
- **Adım**: Products sayfasına git
- **Test**: "AI Ürün Açıklaması Oluştur" butonuna tıkla
- **Vurgula**: Gemini AI entegrasyonu, SEO uyumlu içerik

#### 2.3 AI Stok Tahmini
- **Adım**: "AI Stok Tahmini" kartını kullan
- **Göster**: Yapay zeka destekli stok yönetimi
- **Vurgula**: Veri analizi ve tahmin algoritmaları

#### 2.4 Satış Analizi
- **Adım**: Dashboard'da satış raporlarını göster
- **Vurgula**: Detaylı analitik ve raporlama

### Senaryo 3: Teknik Özellikler (3-5 dakika)

#### 3.1 API Dokümantasyonu
- **Adım**: http://localhost:8000/docs
- **Göster**: Swagger UI, endpoint'ler
- **Vurgula**: RESTful API tasarımı

#### 3.2 Database Yapısı
- **Adım**: SQLite veritabanını göster
- **Göster**: Tablolar, ilişkiler
- **Vurgula**: ORM kullanımı, veri modelleme

#### 3.3 AI Modülleri
- **Adım**: AI endpoint'lerini test et
- **Test**: 
  ```
  POST /api/v1/ai/description
  POST /api/v1/ai/stock-predict
  POST /api/v1/ai/analyze-reviews
  ```
- **Vurgula**: Gemini AI entegrasyonu

## 🎨 UI/UX Vurguları

### Modern Tasarım
- **Gradient renkler**: Mavi-mor geçişler
- **Animasyonlar**: Smooth transitions
- **Responsive**: Mobil uyumlu tasarım

### Kullanıcı Deneyimi
- **Intuitive Navigation**: Kolay gezinme
- **Loading States**: Kullanıcı geri bildirimi
- **Error Handling**: Hata yönetimi

## 🤖 AI Özellikleri

### Gemini Chatbot
- **Doğal Dil**: Türkçe konuşma
- **Kontekst**: Önceki konuşmaları hatırlama
- **Ürün Önerileri**: Kişiselleştirilmiş tavsiyeler

### AI Modülleri
- **Ürün Açıklaması**: SEO uyumlu içerik
- **Stok Tahmini**: Yapay zeka analizi
- **Yorum Analizi**: Duygu analizi

## 📊 Teknik Özellikler

### Backend (FastAPI)
- **Performance**: Yüksek performanslı API
- **Validation**: Pydantic ile veri doğrulama
- **Documentation**: Otomatik API dokümantasyonu

### Frontend (React)
- **Component Architecture**: Modüler yapı
- **State Management**: React Query
- **Styling**: Styled Components

### Database (SQLite)
- **ORM**: SQLAlchemy
- **Migrations**: Alembic
- **Relationships**: Foreign key ilişkileri

## 🚀 Deployment Hazırlığı

### Production Checklist
- [ ] Environment variables
- [ ] Database migration
- [ ] Static file serving
- [ ] CORS configuration
- [ ] Error logging
- [ ] Performance monitoring

### Cloud Deployment
- **Frontend**: Vercel/Netlify
- **Backend**: Heroku/Render
- **Database**: PostgreSQL (Cloud)

## 🎯 Demo İpuçları

### Sunum Teknikleri
1. **Hızlı Başlangıç**: 30 saniyede sistemi çalıştır
2. **Görsel Odaklı**: UI'ı öne çıkar
3. **AI Vurgusu**: Gemini özelliklerini göster
4. **Teknik Derinlik**: Backend özelliklerini açıkla

### Potansiyel Sorular
- **"Gemini API maliyeti nedir?"** → Ücretsiz tier mevcut
- **"Ölçeklenebilirlik?"** → Microservices mimarisi
- **"Güvenlik?"** → JWT authentication, input validation
- **"Mobil uygulama?"** → React Native ile genişletilebilir

## 📈 Gelecek Planları

### Kısa Vadeli (1-3 ay)
- [ ] Mobil uygulama
- [ ] Ödeme entegrasyonu
- [ ] Çoklu dil desteği
- [ ] Gelişmiş analitik

### Uzun Vadeli (6-12 ay)
- [ ] Machine Learning modelleri
- [ ] Computer Vision entegrasyonu
- [ ] Voice assistant
- [ ] AR/VR deneyimi

---

**🎬 Demo Başarılı Olsun!** 

*ShopWise - Geleceğin E-Ticaret Deneyimi* 🚀 