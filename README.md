# 🛍️ ShopWise – Gemini Destekli Akıllı E-Ticaret Asistanı

## 📌 Proje Hakkında

Bu proje, BTK Akademi tarafından düzenlenen E-Ticaret Temalı Hackathon kapsamında geliştirilmiştir. Amacımız, hem alıcıların hem de satıcıların ihtiyaçlarını anlayan, yapay zekâ destekli bütünleşik bir alışveriş deneyimi sunmaktır.

Projemiz, Google Gemini üretken yapay zekâ modelini merkeze alarak; doğal dil ile ürün arama, otomatik ürün açıklaması üretimi, kullanıcı yorumlarının özetlenmesi, adres düzeltme, fiyat takibi, satıcı tavsiyeleri ve chatbot modüllerini bir araya getirir.

## 📦 Temel Özellikler

### 1. 🤖 Gemini ChatBot
- Kullanıcıdan gelen doğal dildeki istekleri analiz eder
- Örnek: "500 TL altında siyah spor ayakkabı öner" → uygun ürünleri listeler

### 2. 🧠 Otomatik Ürün Açıklaması
- Ürün adı ve kısa bilgiye göre Gemini ile SEO uyumlu açıklama üretir

### 3. 💬 Yorum Özeti ve Duygu Analizi
- Kullanıcı yorumlarını özetleyerek olumlu/olumsuz yönleri vurgular

### 4. 📍 Adres Düzeltme
- Karmaşık veya eksik yazılmış adresleri temizler, standart forma getirir

### 5. 📈 Fiyat Takibi ve Kampanya Bildirimi
- Belirli ürünlerdeki fiyat değişikliklerini izler ve kullanıcıyı bilgilendirir

### 6. 📊 Ürün Kıyaslayıcı
- Benzer ürünler arasında fiyat-performans analizine dayalı öneriler sunar

## 🧱 Kullanılan Teknolojiler

- **LLM**: Google Gemini Pro API
- **NLP**: LangChain, Gemini + Prompt Engineering
- **Backend**: Python (FastAPI)
- **Database**: PostgreSQL
- **Frontend**: React.js
- **Harita**: Google Maps API
- **Deployment**: Docker

## 🚀 Kurulum

### Gereksinimler
- Python 3.8+
- Node.js 16+
- PostgreSQL
- Google Gemini API Key

### Backend Kurulumu
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Frontend Kurulumu
```bash
cd frontend
npm install
```

### Environment Variables
```bash
# .env dosyası oluşturun
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=postgresql://user:password@localhost/shopwise
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## 🏃‍♂️ Çalıştırma

### Backend
```bash
cd backend
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm start
```

## 📁 Proje Yapısı

```
shopwise/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   ├── services/
│   │   └── utils/
│   ├── requirements.txt
│   └── main.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   ├── package.json
│   └── public/
├── docs/
├── tests/
└── README.md
```

## 👥 Ekip

- **Proje Sahibi / Geliştirici**: KADİR KURTULUŞ VE BUSE YAĞDIRAN

## 📄 Lisans

Bu proje BTK Akademi Hackathon kapsamında geliştirilmiştir.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun 