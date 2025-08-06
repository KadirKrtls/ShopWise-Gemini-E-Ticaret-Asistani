// Gerçekçi Türkçe ürün yorumları
export const sampleReviews = {
  1: [ // iPhone 15 Pro
    {
      id: 1,
      userId: 101,
      userName: "Ahmet K.",
      rating: 5,
      comment: "iPhone 15 Pro harika bir telefon! Kamera kalitesi çok iyi, A17 Pro çip sayesinde çok hızlı. Titanium tasarım elegant ve dayanıklı görünüyor. Kesinlikle tavsiye ederim.",
      date: "2024-07-15",
      helpful: 24,
      verified: true
    },
    {
      id: 2,
      userId: 102,
      userName: "Elif M.",
      rating: 4,
      comment: "Telefon çok iyi ama fiyatı gerçekten yüksek. Kamera ve performans harika ama bu fiyata değer mi tartışılır. Eski iPhone'umdan büyük fark var.",
      date: "2024-07-10",
      helpful: 18,
      verified: true
    },
    {
      id: 3,
      userId: 103,
      userName: "Mehmet S.",
      rating: 5,
      comment: "Profesyonel fotoğrafçıyım, kamera kalitesi beklentilerimi aştı. ProRes video çekimi süper. Pil ömrü de oldukça iyi. Apple bir kez daha mükemmel iş çıkarmış.",
      date: "2024-07-08",
      helpful: 32,
      verified: true
    }
  ],
  2: [ // Samsung Galaxy S24
    {
      id: 4,
      userId: 104,
      userName: "Zeynep A.",
      rating: 4,
      comment: "Samsung Galaxy S24 kullanışlı bir telefon. Android 14 çok akıcı, kamera da fena değil. Fakat iPhone kadar premium hissettirmiyor. Yine de fiyat-performans olarak iyi.",
      date: "2024-07-12",
      helpful: 15,
      verified: true
    },
    {
      id: 5,
      userId: 105,
      userName: "Can D.",
      rating: 5,
      comment: "Samsung'dan çok memnunum! S Pen desteği harika, çizim yapıyorum sürekli. 200MP kamera detayları çok net çekiyor. Şarj hızı da çok iyi.",
      date: "2024-07-09",
      helpful: 21,
      verified: true
    }
  ],
  3: [ // MacBook Air M2
    {
      id: 6,
      userId: 106,
      userName: "Deniz L.",
      rating: 5,
      comment: "MacBook Air M2 mükemmel! Çok hafif, sessiz ve hızlı. Video editing yapıyorum, hiç donma yok. Pil ömrü 15-16 saat gidiyor. Apple Silicon gerçekten harika.",
      date: "2024-07-14",
      helpful: 28,
      verified: true
    },
    {
      id: 7,
      userId: 107,
      userName: "Seda Y.",
      rating: 4,
      comment: "Laptop çok iyi ama adaptör ayrı satılması kötü. Ekran kalitesi süper, klavye rahat. Sadece port sayısı az, hub almak gerekiyor.",
      date: "2024-07-11",
      helpful: 12,
      verified: false
    }
  ],
  4: [ // Nike Air Max 270
    {
      id: 8,
      userId: 108,
      userName: "Burak T.",
      rating: 4,
      comment: "Ayakkabı rahat ama biraz dar geldi. Kalitesi iyi, tasarım modern. Spor için uygun ama yürüyüş için daha rahat ayakkabılar var.",
      date: "2024-07-13",
      helpful: 9,
      verified: true
    }
  ]
};

export const sampleBulkReviews = [
  "Bu ürün gerçekten harika! Kalitesi çok iyi ve fiyatına değer.",
  "Hızlı kargo, güvenli paketleme. Ürün açıklamada yazıldığı gibi.",
  "Beklentilerimi karşılamadı. Kalite düşük, para vermeye değmez.",
  "Mükemmel ürün! Herkese tavsiye ederim, çok memnun kaldım.",
  "Ortalama bir ürün. İyi yanları da var kötü yanları da var.",
  "Kargo gecikmeli geldi ama ürün kaliteli. Memnunum genel olarak.",
  "Fiyatına göre idare eder. Çok yüksek beklenti olmasın.",
  "Harika! Tam aradığım özelliklerde. Kesinlikle tekrar alırım.",
  "Ürün hasarlı geldi, iade ettim. Paketleme daha dikkatli olmalı.",
  "Süper kalite! Para vermeye değer, uzun süre kullanılır.",
  "Vasat. Ne çok iyi ne çok kötü. Ortalama bir deneyim.",
  "Kötü kalite, hemen bozuldu. Para israfı oldu benim için.",
  "Çok beğendim! Tasarım ve işlevsellik mükemmel.",
  "Pahalı ama kaliteli. Bu fiyata daha iyi alternatifler var.",
  "Mağazadan aldığımdan farksız. Online alışverişe güvenim arttı.",
  "Berbat ürün! Hiç tavsiye etmiyorum, paranızı başka yere harcayın.",
  "İyi ürün ama kargo çok yavaştı. Ürün memnuniyetim var.",
  "Kaliteli malzeme kullanılmış. Uzun ömürlü olacağını düşünüyorum.",
  "Beklediğimden küçük geldi. Ölçüleri tekrar kontrol edin.",
  "Mükemmel müşteri hizmeti! Ürün de çok kaliteli, teşekkürler."
];

// Basit Türkçe duygu analizi
export const analyzeTurkishSentiment = (text) => {
  const positiveWords = [
    'harika', 'mükemmel', 'süper', 'güzel', 'iyi', 'kaliteli', 'beğendim',
    'tavsiye', 'memnun', 'başarılı', 'hızlı', 'rahat', 'modern', 'elegant',
    'dayanıklı', 'akıcı', 'net', 'hafif', 'sessiz'
  ];
  
  const negativeWords = [
    'kötü', 'berbat', 'vasat', 'pahalı', 'yavaş', 'hasarlı', 'bozuk',
    'dar', 'gecikmeli', 'düşük', 'israf', 'tavsiye etmiyorum', 'donma',
    'küçük', 'az'
  ];
  
  const lowerText = text.toLowerCase();
  let positiveScore = 0;
  let negativeScore = 0;
  
  positiveWords.forEach(word => {
    if (lowerText.includes(word)) positiveScore++;
  });
  
  negativeWords.forEach(word => {
    if (lowerText.includes(word)) negativeScore++;
  });
  
  if (positiveScore > negativeScore) return 'positive';
  if (negativeScore > positiveScore) return 'negative';
  return 'neutral';
};

// Anahtar kelime çıkarma
export const extractKeywords = (text) => {
  const stopWords = ['bir', 'bu', 'da', 'de', 'için', 'ile', 'var', 'yok', 'çok', 'daha', 'en', 'olan', 'oldu', 'ama', 'fakat', 'ancak', 'gibi', 'kadar'];
  const words = text.toLowerCase()
    .replace(/[^\w\sığüşöçİĞÜŞÖÇ]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.includes(word));
  
  const wordCount = {};
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });
  
  return Object.entries(wordCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([word]) => word);
};

// Mock analiz fonksiyonu
export const mockAnalyzeReviews = (reviews) => {
  const sentiments = reviews.map(review => analyzeTurkishSentiment(review));
  const positiveCount = sentiments.filter(s => s === 'positive').length;
  const negativeCount = sentiments.filter(s => s === 'negative').length;
  const neutralCount = sentiments.filter(s => s === 'neutral').length;
  
  const allText = reviews.join(' ');
  const keywords = extractKeywords(allText);
  
  const positiveAspects = keywords.filter(word => 
    ['kaliteli', 'harika', 'mükemmel', 'iyi', 'güzel', 'hızlı', 'rahat'].some(pos => word.includes(pos))
  ).slice(0, 5);
  
  const negativeAspects = keywords.filter(word => 
    ['kötü', 'pahalı', 'yavaş', 'hasarlı', 'düşük'].some(neg => word.includes(neg))
  ).slice(0, 5);
  
  const ratingEstimate = positiveCount > negativeCount ? 
    Math.min(5, 3.5 + (positiveCount / reviews.length) * 1.5) :
    Math.max(1, 3.5 - (negativeCount / reviews.length) * 1.5);
  
  return {
    summary: `${reviews.length} yorum analiz edildi. %${Math.round((positiveCount/reviews.length)*100)} pozitif, %${Math.round((negativeCount/reviews.length)*100)} negatif, %${Math.round((neutralCount/reviews.length)*100)} nötr duygu tespit edildi.`,
    positive_aspects: positiveAspects.length > 0 ? positiveAspects : ['Genel memnuniyet', 'Kalite', 'Fiyat-performans'],
    negative_aspects: negativeAspects.length > 0 ? negativeAspects : ['Kargo süresi', 'Paketleme'],
    rating_estimate: Math.round(ratingEstimate * 10) / 10,
    sentiment_distribution: {
      positive: positiveCount,
      negative: negativeCount,
      neutral: neutralCount
    },
    keywords: keywords.slice(0, 8)
  };
};