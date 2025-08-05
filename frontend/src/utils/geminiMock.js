export const geminiMockResponses = {
  chatbot: {
    "merhaba": "Merhaba! Ben ShopWise asistanınız. Size nasıl yardımcı olabilirim? Ürün arama, öneriler veya herhangi bir konuda destek verebilirim.",
    "500 tl altında telefon": "500 TL altında telefon önerileri:\n\n1. **Xiaomi Redmi 9A** - 450 TL\n   - 6.53 inç ekran\n   - 13MP kamera\n   - 5000mAh pil\n\n2. **Samsung Galaxy A02s** - 480 TL\n   - 6.5 inç ekran\n   - 13MP kamera\n   - 5000mAh pil\n\nBu telefonlar günlük kullanım için ideal ve bütçe dostu seçeneklerdir.",
    "spor ayakkabı": "Spor ayakkabı önerileri:\n\n🏃‍♂️ **Koşu için:**\n- Nike Air Zoom Pegasus\n- Adidas Ultraboost\n- Asics Gel-Kayano\n\n🏋️‍♂️ **Fitness için:**\n- Nike Metcon\n- Reebok Nano\n- Under Armour Tribase\n\n🚶‍♂️ **Günlük kullanım:**\n- Nike Air Max\n- Adidas Cloudfoam\n- New Balance 574\n\nHangi aktivite için arıyorsunuz?",
    "kampanya": "🎉 **Güncel Kampanyalar:**\n\n📱 **Telefonlar:**\n- iPhone 15 Pro: %10 indirim\n- Samsung Galaxy S24: %15 indirim\n\n💻 **Bilgisayarlar:**\n- MacBook Air M2: %8 indirim\n- Dell XPS 13: %12 indirim\n\n👟 **Spor Ayakkabı:**\n- Nike Air Max: %25 indirim\n- Adidas Ultraboost: %20 indirim\n\nBu kampanyalar sınırlı süre için geçerlidir!",
    "teslimat": "🚚 **Teslimat Bilgileri:**\n\n📦 **Standart Teslimat:**\n- 2-3 iş günü\n- 15 TL\n- 100 TL üzeri ücretsiz\n\n⚡ **Hızlı Teslimat:**\n- Aynı gün (İstanbul)\n- 25 TL\n- 200 TL üzeri ücretsiz\n\n🏪 **Mağazadan Teslim:**\n- 1 saat içinde\n- Ücretsiz\n- Sadece büyük şehirlerde\n\nHangi teslimat seçeneğini tercih edersiniz?"
  },
  
  productDescription: {
    "iPhone 15 Pro": "**iPhone 15 Pro - Teknoloji ve Tasarımın Mükemmel Uyumu**\n\n📱 **A17 Pro Çip:**** Dünyanın en güçlü akıllı telefon çipi ile oyun ve uygulama performansında devrim yaratın.\n\n📸 **48MP Ana Kamera:**** ProRAW desteği ile profesyonel fotoğrafçılık deneyimi yaşayın.\n\n🔋 **Titanium Tasarım:**** Uzay aracı kalitesinde malzeme ile dayanıklılık ve hafiflik bir arada.\n\n⚡ **USB-C Bağlantı:**** Hızlı veri transferi ve şarj için modern bağlantı teknolojisi.\n\n🎮 **Gaming Deneyimi:**** AAA oyunları maksimum ayarlarda oynayın.\n\nBu telefon, teknoloji tutkunları ve profesyonel kullanıcılar için tasarlanmış premium bir deneyim sunar.",
    
    "Samsung Galaxy S24": "**Samsung Galaxy S24 - AI Destekli Akıllı Deneyim**\n\n🤖 **Galaxy AI:**** Yapay zeka destekli özelliklerle günlük kullanımınızı kolaylaştırın.\n\n📸 **200MP Kamera Sistemi:**** Space Zoom teknolojisi ile uzak mesafe fotoğrafları net çekin.\n\n📱 **S Pen Desteği:**** Dahil S Pen ile not alma ve çizim yapma imkanı.\n\n🔋 **5000mAh Pil:**** Uzun süreli kullanım için güçlü pil performansı.\n\n⚡ **Snapdragon 8 Gen 3:**** En son işlemci teknolojisi ile hızlı ve verimli performans.\n\nBu telefon, yaratıcılık ve üretkenlik odaklı kullanıcılar için ideal bir seçimdir."
  },
  
  reviewAnalysis: {
    positive: {
      sentiment: "positive",
      summary: "Kullanıcılar ürünün kalitesi, performansı ve tasarımından çok memnun.",
      positive_aspects: ["Yüksek kalite", "Hızlı performans", "Modern tasarım", "Uzun pil ömrü"],
      negative_aspects: ["Fiyat biraz yüksek"],
      overall_rating: 4.7
    },
    negative: {
      sentiment: "negative", 
      summary: "Kullanıcılar ürünün fiyatı ve bazı teknik sorunlardan şikayetçi.",
      positive_aspects: ["Tasarım güzel"],
      negative_aspects: ["Yüksek fiyat", "Pil sorunu", "Kamera kalitesi düşük"],
      overall_rating: 2.8
    }
  },
  
  addressCorrection: {
    "kadikoy istanbul": {
      original: "kadikoy istanbul",
      corrected: "Kadıköy, İstanbul, Türkiye",
      components: {
        street: "Kadıköy",
        city: "İstanbul", 
        district: "Kadıköy",
        postal_code: "34700",
        country: "Türkiye"
      }
    },
    "ankara kizilay": {
      original: "ankara kizilay",
      corrected: "Kızılay, Çankaya, Ankara, Türkiye",
      components: {
        street: "Kızılay",
        city: "Ankara",
        district: "Çankaya", 
        postal_code: "06420",
        country: "Türkiye"
      }
    }
  },
  
  searchAnalysis: {
    "500 tl altında telefon": {
      category: "Telefon",
      price_range: "0-500",
      brand: "herhangi",
      features: ["bütçe dostu", "temel özellikler"],
      intent: "bütçe telefon arama"
    },
    "spor ayakkabı": {
      category: "Spor Ayakkabı", 
      price_range: "herhangi",
      brand: "herhangi",
      features: ["spor", "rahat"],
      intent: "spor ayakkabı arama"
    }
  }
};

export const getMockResponse = (type, query) => {
  const responses = geminiMockResponses[type];
  if (!responses) return "Üzgünüm, bu konuda yardım edemiyorum.";
  
  const lowercaseQuery = query.toLowerCase();
  
  // Exact match
  if (responses[query]) {
    return responses[query];
  }
  
  // Partial match
  for (const [key, response] of Object.entries(responses)) {
    if (lowercaseQuery.includes(key.toLowerCase()) || key.toLowerCase().includes(lowercaseQuery)) {
      return response;
    }
  }
  
  // Default response
  return responses[Object.keys(responses)[0]] || "Üzgünüm, bu konuda yardım edemiyorum.";
}; 