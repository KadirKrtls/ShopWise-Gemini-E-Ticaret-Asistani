// E-Commerce API Utilities
// Gerçek API'ler (DummyJSON, FakeStore) ile entegre mock veriler
// Fallback olarak kullanılır

export const ecommerceCategories = [
  { id: 1, name: "Elektronik", slug: "elektronik" },
  { id: 2, name: "Moda", slug: "moda" },
  { id: 3, name: "Ev & Yaşam", slug: "ev-yasam" },
  { id: 4, name: "Spor & Outdoor", slug: "spor-outdoor" },
  { id: 5, name: "Kozmetik", slug: "kozmetik" },
  { id: 6, name: "Ayakkabı & Çanta", slug: "ayakkabi-canta" },
  { id: 7, name: "Saat & Aksesuar", slug: "saat-aksesuar" },
  { id: 8, name: "Anne & Bebek", slug: "anne-bebek" },
  { id: 9, name: "Kitap", slug: "kitap" },
  { id: 10, name: "Otomotiv", slug: "otomotiv" }
];

// BÜYÜK E-TİCARET VERİTABANI - Mock Fallback Ürünleri
export const trendyolMockProducts = [
  {
    id: "ty_1",
    name: "iPhone 15 Pro 128GB Doğal Titanyum",
    brand: "Apple",
    price: 47999,
    originalPrice: 49999,
    rating: 4.8,
    reviews: 2847,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop&crop=center",
    description: "A17 Pro çip, 48MP kamera sistemi, Titanium tasarım",
    features: ["A17 Pro çip", "48MP kamera", "Titanium", "USB-C", "Action Button"],
    inStock: true,
    stockCount: 23,
    discount: 4,
    trendScore: 98,
    trustScore: 97,
    returnRate: 2,
    category: "Elektronik",
    seller: "Apple Türkiye",
    fastShipping: true,
    freeShipping: true
  },
  {
    id: "ty_2", 
    name: "Samsung Galaxy S24 Ultra 256GB Titanium Black",
    brand: "Samsung",
    price: 42999,
    originalPrice: 45999,
    rating: 4.7,
    reviews: 1923,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop&crop=center",
    description: "Snapdragon 8 Gen 3, 200MP kamera, S Pen dahil",
    features: ["Snapdragon 8 Gen 3", "200MP kamera", "S Pen", "AI özellikleri"],
    inStock: true,
    stockCount: 47,
    discount: 7,
    trendScore: 94,
    trustScore: 95,
    returnRate: 3,
    category: "Elektronik",
    seller: "Samsung Türkiye",
    fastShipping: true,
    freeShipping: true
  },
  {
    id: "ty_3",
    name: "Nike Air Max 270 Erkek Spor Ayakkabı",
    brand: "Nike",
    price: 3299,
    originalPrice: 3999,
    rating: 4.6,
    reviews: 5647,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&crop=center",
    description: "Maksimum hava yastığı ile üstün konfor",
    features: ["Air Max teknolojisi", "Mesh üst", "Dayanıklı taban", "Çok renkli"],
    inStock: true,
    stockCount: 156,
    discount: 18,
    trendScore: 89,
    trustScore: 92,
    returnRate: 5,
    category: "Spor & Outdoor",
    seller: "Nike Resmi Mağaza",
    fastShipping: true,
    freeShipping: false
  },
  {
    id: "ty_4",
    name: "MacBook Air M2 13 inç 256GB Gece Yarısı",
    brand: "Apple",
    price: 34999,
    originalPrice: 36999,
    rating: 4.9,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop&crop=center",
    description: "M2 çip, 13.6 inç Liquid Retina ekran, 18 saat pil",
    features: ["M2 çip", "13.6 inç ekran", "18 saat pil", "MagSafe şarj"],
    inStock: true,
    stockCount: 12,
    discount: 5,
    trendScore: 96,
    trustScore: 98,
    returnRate: 1,
    category: "Elektronik",
    seller: "Apple Türkiye",
    fastShipping: true,
    freeShipping: true
  },
  {
    id: "ty_5",
    name: "Sony WH-1000XM5 Kablosuz Kulaklık",
    brand: "Sony",
    price: 8999,
    originalPrice: 9999,
    rating: 4.8,
    reviews: 3421,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&crop=center",
    description: "Endüstri lideri gürültü engelleme teknolojisi",
    features: ["Aktif gürültü engelleme", "30 saat pil", "Hızlı şarj", "Hi-Res Audio"],
    inStock: true,
    stockCount: 78,
    discount: 10,
    trendScore: 91,
    trustScore: 94,
    returnRate: 4,
    category: "Elektronik",
    seller: "Sony Resmi Mağaza",
    fastShipping: true,
    freeShipping: true
  },
  {
    id: "ty_6",
    name: "Zara Kadın Oversize Blazer Ceket",
    brand: "Zara",
    price: 1299,
    originalPrice: 1599,
    rating: 4.4,
    reviews: 2156,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop&crop=center",
    description: "Oversize kesim, çift düğmeli, astarlı",
    features: ["Oversize kesim", "Çift düğmeli", "Astarlı", "Polyester karışımı"],
    inStock: true,
    stockCount: 234,
    discount: 19,
    trendScore: 85,
    trustScore: 88,
    returnRate: 8,
    category: "Moda",
    seller: "Zara",
    fastShipping: false,
    freeShipping: false
  },
  {
    id: "ty_7",
    name: "Dyson V15 Detect Kablosuz Süpürge",
    brand: "Dyson",
    price: 12999,
    originalPrice: 14999,
    rating: 4.7,
    reviews: 1567,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center",
    description: "Lazer teknolojisi ile görünmez tozu bile tespit eder",
    features: ["Lazer teknolojisi", "LCD ekran", "60 dk çalışma", "HEPA filtre"],
    inStock: true,
    stockCount: 34,
    discount: 13,
    trendScore: 93,
    trustScore: 96,
    returnRate: 3,
    category: "Ev & Yaşam",
    seller: "Dyson Türkiye",
    fastShipping: true,
    freeShipping: true
  },
  {
    id: "ty_8",
    name: "Adidas Ultraboost 22 Koşu Ayakkabısı",
    brand: "Adidas",
    price: 2799,
    originalPrice: 3299,
    rating: 4.5,
    reviews: 4523,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&crop=center",
    description: "Boost teknolojisi ile maksimum enerji geri dönüşü",
    features: ["Boost teknolojisi", "Primeknit üst", "Continental taban", "Hafif"],
    inStock: true,
    stockCount: 89,
    discount: 15,
    trendScore: 87,
    trustScore: 90,
    returnRate: 6,
    category: "Spor & Outdoor",
    seller: "Adidas Resmi Mağaza",
    fastShipping: true,
    freeShipping: false
  },
  {
    id: "ty_9",
    name: "L'Oréal Paris Revitalift Laser X3 Serum",
    brand: "L'Oréal Paris",
    price: 299,
    originalPrice: 399,
    rating: 4.3,
    reviews: 8934,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop&crop=center",
    description: "Anti-aging serum, kırışıklık karşıtı formül",
    features: ["Pro-Xylane", "Kırışıklık karşıtı", "Sıkılaştırıcı", "30ml"],
    inStock: true,
    stockCount: 456,
    discount: 25,
    trendScore: 82,
    trustScore: 86,
    returnRate: 7,
    category: "Kozmetik",
    seller: "L'Oréal Paris",
    fastShipping: false,
    freeShipping: false
  },
  {
    id: "ty_10",
    name: "Apple Watch Series 9 GPS 45mm",
    brand: "Apple",
    price: 12999,
    originalPrice: 13999,
    rating: 4.8,
    reviews: 1234,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&crop=center",
    description: "S9 çip, 45mm, GPS + Cellular, sağlık takibi",
    features: ["S9 çip", "Always-On Retina", "Sağlık sensörleri", "WatchOS 10"],
    inStock: true,
    stockCount: 67,
    discount: 7,
    trendScore: 95,
    trustScore: 97,
    returnRate: 2,
    category: "Elektronik",
    seller: "Apple Türkiye",
    fastShipping: true,
    freeShipping: true
  }
];

// E-ticaret arama fonksiyonu (mock fallback)
export const searchTrendyolProducts = (query, limit = 20) => {
  const searchQuery = query.toLowerCase().trim();
  
  if (!searchQuery) {
    return trendyolMockProducts.slice(0, limit);
  }
  
  // Basit arama algoritması
  const results = trendyolMockProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery) ||
    product.brand.toLowerCase().includes(searchQuery) ||
    product.category.toLowerCase().includes(searchQuery) ||
    product.description.toLowerCase().includes(searchQuery)
  );
  
  return results.slice(0, limit);
};

// Kategori bazlı ürün getirme
export const getTrendyolProductsByCategory = (categorySlug, limit = 20) => {
  const category = ecommerceCategories.find(cat => cat.slug === categorySlug);
  if (!category) return [];
  
  const results = trendyolMockProducts.filter(product => 
    product.category === category.name
  );
  
  return results.slice(0, limit);
};

// Trend ürünler (yüksek trendScore'a sahip)
export const getTrendingTrendyolProducts = (limit = 10) => {
  return trendyolMockProducts
    .sort((a, b) => b.trendScore - a.trendScore)
    .slice(0, limit);
};

// İndirimli ürünler
export const getDiscountedTrendyolProducts = (limit = 10) => {
  return trendyolMockProducts
    .filter(product => product.discount > 0)
    .sort((a, b) => b.discount - a.discount)
    .slice(0, limit);
};

// Fiyat aralığına göre filtreleme
export const filterTrendyolProductsByPrice = (minPrice, maxPrice, limit = 20) => {
  return trendyolMockProducts
    .filter(product => product.price >= minPrice && product.price <= maxPrice)
    .slice(0, limit);
};

// Marka bazlı filtreleme
export const getTrendyolProductsByBrand = (brand, limit = 20) => {
  return trendyolMockProducts
    .filter(product => product.brand.toLowerCase() === brand.toLowerCase())
    .slice(0, limit);
};

export default {
  ecommerceCategories,
  trendyolMockProducts,
  searchTrendyolProducts,
  getTrendyolProductsByCategory,
  getTrendingTrendyolProducts,
  getDiscountedTrendyolProducts,
  filterTrendyolProductsByPrice,
  getTrendyolProductsByBrand
};