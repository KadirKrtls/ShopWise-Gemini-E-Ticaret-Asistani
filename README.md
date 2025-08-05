# 🛒 ShopWise - AI Destekli E-Ticaret Asistanı

<div align="center">

![ShopWise Logo](https://img.shields.io/badge/ShopWise-AI%20E--Commerce-blue?style=for-the-badge)

**🏆 BTK Hackathon 2025 Projesi**

*Google Gemini AI ile güçlendirilmiş akıllı alışveriş deneyimi*

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Google Gemini](https://img.shields.io/badge/Google-Gemini%20AI-4285F4?style=flat-square&logo=google)](https://ai.google.dev/)
[![Styled Components](https://img.shields.io/badge/Styled-Components-DB7093?style=flat-square&logo=styled-components)](https://styled-components.com/)

</div>

---

## 🎯 Proje Özeti

ShopWise, **Google Gemini AI** teknolojisi ile geliştirilmiş yeni nesil e-ticaret asistanıdır. Kullanıcıların doğal dil ile ürün arayabildiği, kişiselleştirilmiş öneriler alabileceği ve akıllı karşılaştırmalar yapabileceği kapsamlı bir platformdur.

### ✨ Temel Özellikler

| Özellik | Açıklama | AI Desteği |
|---------|----------|------------|
| 🤖 **Gemini ChatBot** | Doğal dil ile ürün arama ve danışmanlık | ✅ |
| 🔍 **Akıllı Arama** | Görsel ve sesli komutlarla arama | ✅ |
| 📊 **Ürün Karşılaştırma** | AI destekli detaylı karşılaştırma | ✅ |
| ⭐ **Yorum Analizi** | Duygu analizi ve özet çıkarma | ✅ |
| 📍 **Adres Düzeltme** | Eksik adresleri otomatik tamamlama | ✅ |
| 📈 **Fiyat Takibi** | Akıllı fiyat tahminleri ve uyarılar | ✅ |

---

## 🚀 Teknoloji Stack

### Frontend
```
React 18.2.0          │ Modern UI framework
Styled Components     │ CSS-in-JS styling
React Router Dom      │ SPA navigation
React Query          │ Data fetching & caching
Framer Motion        │ Smooth animations
Lucide React         │ Beautiful icons
```

### Backend
```
FastAPI 0.104.1      │ High-performance API
Google Gemini AI     │ Advanced language model
SQLAlchemy           │ Database ORM
Pydantic             │ Data validation
Uvicorn              │ ASGI server
```

### AI & Services
```
Google Gemini 1.5    │ Natural language processing
LangChain            │ AI application framework
React Hot Toast      │ User notifications
```

---

## 🎬 Demo ve Ekran Görüntüleri

### 🏠 Ana Dashboard
- **Sistem Durumu**: Gerçek zamanlı AI aktivite monitörü
- **İstatistikler**: Animasyonlu kullanıcı ve ürün metrikleri
- **Gemini Showcase**: AI özelliklerinin öne çıkarıldığı alan

### 🤖 Gemini AI Chatbot
- **Doğal Dil Anlama**: Türkçe konuşma desteği
- **Kontekstuel Yanıtlar**: Önceki konuşmaları hatırlama
- **Ürün Önerileri**: Bütçe ve ihtiyaç odaklı tavsiyeler
- **Markdown Desteği**: Formatlanmış güzel yanıtlar

### 🔍 Akıllı Özellikler
- **Sesli Komutlar**: "500 TL altında telefon öner"
- **Görsel Arama**: Fotoğraf ile ürün bulma
- **Fiyat Karşılaştırması**: Multi-platform analiz
- **Trend Analizi**: Popüler ürün öngörüleri

---

## ⚡ Hızlı Başlangıç

### 📋 Gereksinimler
- Node.js 16+ 
- Python 3.8+
- Google Gemini API Key

### 🛠️ Kurulum

1. **Projeyi klonlayın**
```bash
git clone https://github.com/[username]/Btk_Hackathon_25.git
cd Btk_Hackathon_25
```

2. **Otomatik kurulum** (önerilen)
```bash
chmod +x setup.sh
./setup.sh
```

3. **Manuel kurulum**
```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Frontend
cd ../frontend
npm install
```

### 🔐 API Anahtarı Konfigürasyonu

1. **Google AI Studio**'dan Gemini API anahtarı alın:
   ```
   https://makersuite.google.com/app/apikey
   ```

2. **Backend .env dosyası oluşturun**:
   ```bash
   cd backend
   cp ../env.example .env
   ```

3. **API anahtarını ekleyin**:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

### 🚀 Çalıştırma

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate
python main.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

**Uygulama adresleri:**
- 🌐 Frontend: http://localhost:3000
- 🔌 Backend API: http://localhost:8000
- 📖 API Docs: http://localhost:8000/docs

---

## 🎯 AI Özellikleri ve Kullanım Örnekleri

### 💬 Gemini ChatBot Örnekleri

```
🗣️ Kullanıcı: "Merhaba, bana yardım edebilir misin?"
🤖 Gemini: "Merhaba! Ben ShopWise AI asistanınız. Size nasıl yardımcı olabilirim? 
           Ürün arama, fiyat karşılaştırması, kampanya bilgileri..."

🗣️ Kullanıcı: "500 TL altında gaming mouse öner"
🤖 Gemini: "Gaming için harika seçenekler buldum:
           • Logitech G502 Hero - 450 TL (4.8⭐)
           • Razer DeathAdder V3 - 380 TL (4.7⭐)
           • SteelSeries Rival 600 - 420 TL (4.6⭐)"

🗣️ Kullanıcı: "iPhone 15 ile Galaxy S24 karşılaştır"
🤖 Gemini: "Detaylı karşılaştırma hazırladım:
           📱 iPhone 15: A16 chip, 48MP kamera, iOS ekosistemi
           📱 Galaxy S24: Snapdragon 8 Gen 3, AI özellikler, S Pen
           💡 Önerim: Fotoğraf için iPhone, çok amaçlı kullanım için Galaxy"
```

### 🔍 Akıllı Arama Örnekleri

- **Doğal Dil**: "Kışlık spor ayakkabı arıyorum"
- **Fiyat Odaklı**: "1000 TL bütçemle en iyi laptop"
- **Marka Tercihi**: "Samsung'un yeni telefonları neler?"
- **Özellik Bazlı**: "Su geçirmez bluetooth kulaklık"

---

## 🏗️ Proje Mimarisi

```
ShopWise/
├── 🎨 frontend/          # React SPA
│   ├── src/components/   # Reusable UI components
│   ├── src/pages/       # Page components
│   ├── src/data/        # Mock data & constants
│   └── src/utils/       # Helper functions
│
├── ⚡ backend/           # FastAPI Server
│   ├── app/api/         # API endpoints
│   ├── app/services/    # Business logic
│   ├── app/models/      # Database models
│   └── app/core/        # Configuration
│
└── 📦 deployment/       # Docker & deployment configs
```

### 🔄 API Endpoints

| Endpoint | Metod | Açıklama |
|----------|-------|----------|
| `/api/v1/chatbot/chat` | POST | Gemini AI sohbet |
| `/api/v1/products/search` | GET | Ürün arama |
| `/api/v1/reviews/analyze` | POST | Yorum analizi |
| `/api/v1/addresses/correct` | POST | Adres düzeltme |

---

## 🎨 UI/UX Özellikleri

### ✨ Animasyonlar
- **Smooth Transitions**: Framer Motion ile akıcı geçişler
- **Loading States**: Typing indicators ve skeleton screens
- **Micro Interactions**: Hover effects ve button animations

### 🎯 Responsive Design
- **Mobile First**: Mobil cihazlar için optimize
- **Tablet Support**: Orta ekran boyutları
- **Desktop Enhanced**: Büyük ekranlar için gelişmiş özellikler

### 🌈 Tema ve Renkler
- **Modern Gradient**: Çağdaş gradyan tasarımı
- **Accessibility**: WCAG 2.1 uyumlu renkler
- **Brand Colors**: Tutarlı marka kimliği

---

## 🔧 Geliştirme ve Test

### 🧪 Test Komutları
```bash
# Frontend testleri
cd frontend && npm test

# Backend testleri  
cd backend && python -m pytest

# Gemini AI test
cd backend && python test_gemini.py
```

### 🐛 Debug Modları
```bash
# Frontend debug
REACT_APP_DEBUG=true npm start

# Backend debug
DEBUG=true python main.py
```

---

## 🚀 Deployment

### 🐳 Docker ile Deployment
```bash
# Tüm servisleri başlat
docker-compose up -d

# Sadece production build
docker-compose -f docker-compose.prod.yml up -d
```

### ☁️ Cloud Deployment
- **Frontend**: Vercel, Netlify
- **Backend**: Railway, Heroku, DigitalOcean
- **Database**: PostgreSQL (Cloud)

---

## 📈 Proje Hedefleri ve Başarılar

### 🎯 Teknik Hedefler
- ✅ Google Gemini AI entegrasyonu
- ✅ Real-time chat interface
- ✅ Responsive modern UI
- ✅ RESTful API architecture
- ✅ Error handling ve validation

### 🏆 İnovasyon Noktaları
- **AI-First Approach**: Gemini odaklı kullanıcı deneyimi
- **Natural Language**: Türkçe doğal dil işleme
- **Smart Recommendations**: Bağlamsal ürün önerileri
- **Visual Search**: Görsel arama teknolojisi

---

## 👥 Ekip

**Geliştiriciler:** Kadir Kurtuluş ve Buse Yağdıran
**Rol:** Full-Stack Developer  
**Teknolojiler:** React, FastAPI, Google Gemini AI

---

## 📄 Lisans

Bu proje BTK Hackathon 2025 için geliştirilmiştir.

---

<div align="center">

**🚀 ShopWise ile Geleceğin E-Ticaret Deneyimini Yaşayın!**

*Google Gemini AI ile güçlendirilmiş akıllı alışveriş asistanı*

⭐ **Projeyi beğendiyseniz yıldız vermeyi unutmayın!** ⭐

</div> 