#!/bin/bash

echo "🚀 ShopWise - Gemini Destekli Akıllı E-Ticaret Asistanı Kurulumu"
echo "================================================================"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker bulunamadı. Lütfen Docker'ı yükleyin."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose bulunamadı. Lütfen Docker Compose'u yükleyin."
    exit 1
fi

echo "✅ Docker ve Docker Compose mevcut"

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 .env dosyası oluşturuluyor..."
    cp env.example .env
    echo "⚠️  Lütfen .env dosyasını düzenleyerek Gemini API anahtarınızı ekleyin!"
    echo "   GEMINI_API_KEY=your_gemini_api_key_here"
    echo ""
fi

echo "🔧 Proje başlatılıyor..."
echo "📦 Docker container'ları oluşturuluyor..."

# Build and start containers
docker-compose up --build -d

echo ""
echo "⏳ Servisler başlatılıyor..."
sleep 10

echo ""
echo "🎉 Kurulum tamamlandı!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:8000"
echo "📚 API Dokümantasyonu: http://localhost:8000/docs"
echo ""
echo "🛠️  Yönetim komutları:"
echo "   - Servisleri durdur: docker-compose down"
echo "   - Logları görüntüle: docker-compose logs -f"
echo "   - Servisleri yeniden başlat: docker-compose restart"
echo ""
echo "⚠️  Önemli: .env dosyasında Gemini API anahtarınızı ayarlamayı unutmayın!" 