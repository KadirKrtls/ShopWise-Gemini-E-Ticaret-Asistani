export const sampleProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    category: "Telefon",
    brand: "Apple",
    price: 45999,
    originalPrice: 47999,
    rating: 4.8,
    reviews: 1247,
    image: "📱",
    description: "A17 Pro çip, 48MP kamera, Titanium tasarım",
    features: ["A17 Pro çip", "48MP kamera", "Titanium", "USB-C"],
    inStock: true,
    discount: 4,
    trendScore: 95,
    trustScore: 98,
    returnRate: 2
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    category: "Telefon",
    brand: "Samsung",
    price: 39999,
    originalPrice: 42999,
    rating: 4.6,
    reviews: 892,
    image: "📱",
    description: "Snapdragon 8 Gen 3, 200MP kamera, AI özellikleri",
    features: ["Snapdragon 8 Gen 3", "200MP kamera", "AI", "S Pen"],
    inStock: true,
    discount: 7,
    trendScore: 88,
    trustScore: 92,
    returnRate: 5
  },
  {
    id: 3,
    name: "MacBook Air M2",
    category: "Bilgisayar",
    brand: "Apple",
    price: 35999,
    originalPrice: 36999,
    rating: 4.9,
    reviews: 567,
    image: "💻",
    description: "M2 çip, 13.6 inç Retina ekran, 18 saat pil",
    features: ["M2 çip", "13.6 inç", "Retina", "18 saat pil"],
    inStock: true,
    discount: 3,
    trendScore: 92,
    trustScore: 96,
    returnRate: 3
  },
  {
    id: 4,
    name: "Nike Air Max 270",
    category: "Spor Ayakkabı",
    brand: "Nike",
    price: 899,
    originalPrice: 1299,
    rating: 4.5,
    reviews: 2341,
    image: "👟",
    description: "Air Max teknolojisi, günlük kullanım için ideal",
    features: ["Air Max", "Günlük kullanım", "Hafif", "Esnek"],
    inStock: true,
    discount: 31,
    trendScore: 85,
    trustScore: 89,
    returnRate: 8
  },
  {
    id: 5,
    name: "AirPods Pro 2",
    category: "Aksesuar",
    brand: "Apple",
    price: 5999,
    originalPrice: 6499,
    rating: 4.7,
    reviews: 1892,
    image: "🎧",
    description: "Aktif gürültü engelleme, Spatial Audio, şeffaf mod",
    features: ["Aktif gürültü engelleme", "Spatial Audio", "Şeffaf mod"],
    inStock: true,
    discount: 8,
    trendScore: 90,
    trustScore: 94,
    returnRate: 4
  },
  {
    id: 6,
    name: "Sony WH-1000XM5",
    category: "Aksesuar",
    brand: "Sony",
    price: 7999,
    originalPrice: 8999,
    rating: 4.8,
    reviews: 756,
    image: "🎧",
    description: "Endüstri lideri gürültü engelleme, 30 saat pil",
    features: ["Gürültü engelleme", "30 saat pil", "Touch kontrol"],
    inStock: true,
    discount: 11,
    trendScore: 87,
    trustScore: 91,
    returnRate: 6
  },
  {
    id: 7,
    name: "iPad Air 5",
    category: "Tablet",
    brand: "Apple",
    price: 18999,
    originalPrice: 19999,
    rating: 4.6,
    reviews: 432,
    image: "📱",
    description: "M1 çip, 10.9 inç Liquid Retina, Apple Pencil uyumlu",
    features: ["M1 çip", "10.9 inç", "Liquid Retina", "Apple Pencil"],
    inStock: true,
    discount: 5,
    trendScore: 83,
    trustScore: 93,
    returnRate: 4
  },
  {
    id: 8,
    name: "Samsung Galaxy Tab S9",
    category: "Tablet",
    brand: "Samsung",
    price: 15999,
    originalPrice: 17999,
    rating: 4.4,
    reviews: 298,
    image: "📱",
    description: "Snapdragon 8 Gen 2, 11 inç AMOLED, S Pen dahil",
    features: ["Snapdragon 8 Gen 2", "11 inç AMOLED", "S Pen"],
    inStock: true,
    discount: 11,
    trendScore: 79,
    trustScore: 88,
    returnRate: 7
  }
];

export const categories = [
  "Tümü",
  "Telefon",
  "Bilgisayar", 
  "Tablet",
  "Aksesuar",
  "Spor Ayakkabı"
];

export const brands = [
  "Tümü",
  "Apple",
  "Samsung",
  "Nike",
  "Sony"
];

export const getProductsByCategory = (category) => {
  if (category === "Tümü") return sampleProducts;
  return sampleProducts.filter(product => product.category === category);
};

export const getProductsByBrand = (brand) => {
  if (brand === "Tümü") return sampleProducts;
  return sampleProducts.filter(product => product.brand === brand);
};

export const searchProducts = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return sampleProducts.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery)
  );
};

export const getTrendingProducts = () => {
  return sampleProducts
    .sort((a, b) => b.trendScore - a.trendScore)
    .slice(0, 4);
};

export const getDiscountedProducts = () => {
  return sampleProducts
    .filter(product => product.discount > 0)
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 4);
}; 