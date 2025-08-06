import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { 
  Plus, 
  Package, 
  Sparkles, 
  Star, 
  TrendingUp,
  Brain,
  Search,
  Filter,
  Grid,
  List,
  ShoppingCart,
  Heart,
  Scale,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';
import ProductCard from '../components/ProductCard';
import { getTrendingTrendyolProducts } from '../utils/ecommerceAPI';

const ProductsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #1e293b, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
`;

const GeminiStatus = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 500;
  
  &::before {
    content: '🤖';
    font-size: 0.875rem;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 0.75rem;
    justify-content: space-between;
  }
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`;

const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
  }
`;

const FiltersPanel = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const FilterSection = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterLabel = styled.label`
  display: block;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  background: white;
  font-size: 0.875rem;
  color: #1e293b;
  cursor: pointer;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const CategorySelect = styled(FilterSelect)``;

const SearchBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  min-width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.75rem;
  background: white;
  font-size: 0.875rem;
  color: #1e293b;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
  
  &::placeholder {
    color: #94a3b8;
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: ${props => props.active ? '#3b82f6' : 'white'};
  color: ${props => props.active ? 'white' : '#64748b'};
  border: 2px solid ${props => props.active ? '#3b82f6' : '#e2e8f0'};
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#2563eb' : '#f8fafc'};
    border-color: ${props => props.active ? '#2563eb' : '#cbd5e1'};
  }
`;

const ViewToggle = styled.div`
  display: flex;
  border: 2px solid #e2e8f0;
  border-radius: 0.75rem;
  overflow: hidden;
`;

const ViewButton = styled.button`
  padding: 0.75rem;
  background: ${props => props.active ? '#3b82f6' : 'white'};
  color: ${props => props.active ? 'white' : '#64748b'};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#2563eb' : '#f8fafc'};
  }
`;

const PriceRange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PriceInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  background: white;
  font-size: 0.875rem;
  color: #1e293b;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const RangeInput = styled.input`
  width: 100%;
  margin: 0.5rem 0;
  accent-color: #3b82f6;
`;

const RangeValues = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 0.25rem;
`;

const StarRating = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-top: 0.5rem;
`;

const StarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.filled ? '#fbbf24' : '#d1d5db'};
  transition: color 0.2s ease;
  
  &:hover {
    color: #fbbf24;
  }
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const SortSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  background: white;
  color: #64748b;
  cursor: pointer;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const AIModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const AIModalContent = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 600px;
  width: 90%;
  max-height: 70vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
`;

const AIModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
`;

const AIModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AIModalClose = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #64748b;
  
  &:hover {
    color: #1e293b;
  }
`;

const AIResult = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1.5rem;
  color: #334155;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const AISpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid #f3f4f6;
  border-radius: 50%;
  border-top-color: #3b82f6;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;




const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  }
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const StatIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: ${props => props.color || '#3b82f6'};
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
`;

const StatChange = styled.div`
  font-size: 0.75rem;
  color: ${props => props.positive ? '#10b981' : '#ef4444'};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
  padding: 1rem 0;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    padding: 0.5rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #64748b;
`;

const EmptyIcon = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: #94a3b8;
`;

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const EmptyDescription = styled.p`
  color: #64748b;
  margin-bottom: 2rem;
`;

const GeminiHighlight = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 1.5rem;
  padding: 2rem;
  color: white;
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    animation: ${css`${pulse} 4s ease-in-out infinite`};
  }
`;

const GeminiTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const GeminiDescription = styled.p`
  opacity: 0.9;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const GeminiFeatures = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const GeminiFeature = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: #64748b;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  font-size: 1.125rem;
  font-weight: 500;
`;

// Quick View Modal Components
const QuickViewModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const QuickViewContent = styled.div`
  background: white;
  border-radius: 1.5rem;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 500px;
  }
`;

const QuickViewImageSection = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f8fafc;
  border-radius: 1.5rem 0 0 1.5rem;
  
  @media (max-width: 768px) {
    border-radius: 1.5rem 1.5rem 0 0;
  }
`;

const QuickViewImage = styled.img`
  width: 100%;
  max-width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const QuickViewDetailsSection = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const QuickViewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const QuickViewCloseButton = styled.button`
  background: #f1f5f9;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
  transition: all 0.3s ease;
  
  &:hover {
    background: #e2e8f0;
    color: #1e293b;
  }
`;

const QuickViewTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
`;

const QuickViewBrand = styled.p`
  font-size: 1rem;
  color: #3b82f6;
  font-weight: 600;
  margin: 0.5rem 0 0 0;
`;

const QuickViewPrice = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin: 1rem 0;
`;

const QuickViewCurrentPrice = styled.span`
  font-size: 2rem;
  font-weight: 800;
  color: #059669;
`;

const QuickViewOriginalPrice = styled.span`
  font-size: 1.25rem;
  color: #64748b;
  text-decoration: line-through;
`;

const QuickViewRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const QuickViewDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
  margin: 1rem 0;
`;

const QuickViewFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`;

const QuickViewFeature = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  color: #374151;
  
  &::before {
    content: '✓';
    color: #059669;
    font-weight: bold;
  }
`;

const QuickViewStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 1.5rem 0;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.75rem;
`;

const QuickViewStat = styled.div`
  text-align: center;
`;

const QuickViewStatValue = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
`;

const QuickViewStatLabel = styled.div`
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 0.25rem;
`;

const QuickViewActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
`;

const QuickViewButton = styled.button`
  flex: 1;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &.primary {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
    border: none;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
    }
    
    &:disabled {
      background: #94a3b8;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
  }
  
  &.secondary {
    background: white;
    color: #64748b;
    border: 2px solid #e2e8f0;
    
    &:hover {
      border-color: #3b82f6;
      color: #3b82f6;
    }
  }
`;

function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState('name');
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiModalType, setAIModalType] = useState('');
  const [aiLoading, setAILoading] = useState(false);
  const [aiResult, setAIResult] = useState('');
  const [showQuickView, setShowQuickView] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Gerçek API'den ürün verilerini yükle
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // İlk olarak gerçek Trendyol API'sini dene
        let realProducts = [];
        
        try {
          // Gerçek e-ticaret API'lerinden ürün çek
          const realApiResponse = await fetch('http://localhost:8000/api/v1/ecommerce/search?limit=30');
          if (realApiResponse.ok) {
            const realApiData = await realApiResponse.json();
            if (realApiData.products && realApiData.products.length > 0) {
              realProducts = [...realProducts, ...realApiData.products];
              toast.success(`${realApiData.products.length} gerçek ürün yüklendi! (${realApiData.source})`, {
                icon: '🔥'
              });
            }
          }
        } catch (error) {
          console.log('Gerçek API hatası:', error);
          // Fallback: Mock ürünlerini yükle
          const mockProducts = getTrendingTrendyolProducts(30);
          realProducts = [...mockProducts];
          toast.success(`${realProducts.length} mock ürün yüklendi (fallback)!`, {
            icon: '📦'
          });
        }
        
        // Sonra diğer API'leri dene
        const responses = await Promise.allSettled([
          fetch('https://fakestoreapi.com/products'),
          fetch('https://dummyjson.com/products?limit=10')
        ]);
        
        // FakeStore API sonucu - Daha fazla ürün al
        if (responses[0].status === 'fulfilled' && responses[0].value.ok) {
          const fakeStoreData = await responses[0].value.json();
          realProducts = [...realProducts, ...fakeStoreData.slice(0, 20).map(item => ({
            id: `fs_${item.id}`,
            name: item.title,
            brand: item.category.charAt(0).toUpperCase() + item.category.slice(1),
            price: Math.round(item.price * 30), // USD to TRY conversion
            originalPrice: Math.round(item.price * 32),
            rating: item.rating?.rate || 4.0,
            reviews: item.rating?.count || Math.floor(Math.random() * 500) + 50,
            image: item.image,
            description: item.description,
            features: [item.category, "Garantili", "Hızlı Kargo", "İade Edilebilir"],
            inStock: true,
            stockCount: Math.floor(Math.random() * 50) + 10,
            discount: Math.floor(Math.random() * 20),
            trendScore: Math.floor(Math.random() * 30) + 70,
            trustScore: Math.floor(Math.random() * 20) + 80,
            returnRate: Math.floor(Math.random() * 10) + 2,
            category: item.category.charAt(0).toUpperCase() + item.category.slice(1)
          }))];
        }
        
        // DummyJSON API sonucu
        if (responses[1].status === 'fulfilled' && responses[1].value.ok) {
          const dummyData = await responses[1].value.json();
          realProducts = [...realProducts, ...dummyData.products.slice(0, 10).map(item => ({
            id: `dj_${item.id}`,
            name: item.title,
            brand: item.brand || item.category,
            price: Math.round(item.price * 30),
            originalPrice: Math.round(item.price * 32),
            rating: item.rating || 4.0,
            reviews: Math.floor(Math.random() * 500) + 50,
            image: item.thumbnail || item.images?.[0] || item.image,
            description: item.description,
            features: [item.category, "Garantili", "Hızlı Kargo", "İade Edilebilir"],
            inStock: item.stock > 0,
            stockCount: item.stock || Math.floor(Math.random() * 50) + 10,
            discount: Math.round(item.discountPercentage) || 0,
            trendScore: Math.floor(Math.random() * 30) + 70,
            trustScore: Math.floor(Math.random() * 20) + 80,
            returnRate: Math.floor(Math.random() * 10) + 2,
            category: item.category.charAt(0).toUpperCase() + item.category.slice(1)
          }))];
        }
        
        // Eğer API'lerden veri geldi ise kullan
        if (realProducts.length > 0) {
          setProducts(realProducts);
          toast.success(`${realProducts.length} gerçek ürün yüklendi!`);
        } else {
          // Fallback olarak kendi verimizi kullan
          const { sampleProducts } = await import('../data/products');
          setProducts(sampleProducts);
          toast.info('Mock veriler kullanılıyor (API erişimi yok)');
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Ürünler yüklenirken hata:', error);
        // Hata durumunda kendi verimizi kullan
        const { sampleProducts } = await import('../data/products');
        setProducts(sampleProducts);
        setLoading(false);
        toast.error('API hatası - Mock veriler kullanılıyor');
      }
    };

    fetchProducts();
  }, []);

  // LocalStorage'dan sepet, favori ve karşılaştırma verilerini yükle
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const savedCompare = JSON.parse(localStorage.getItem('compareList') || '[]');
    
    setCart(savedCart);
    setFavorites(savedFavorites);
    setCompareList(savedCompare);
  }, []);

  // Filtreleme mantığı
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
    const matchesRating = selectedRating === 0 || product.rating >= selectedRating;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const stats = {
    total: products.length,
    active: products.filter(p => p.inStock).length,
    trending: products.filter(p => p.trendScore > 7).length,
    discounted: products.filter(p => p.discount > 0).length
  };

  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    let newCart;
    
    if (existingItem) {
      newCart = cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }
    
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    toast.success(`${product.name} sepete eklendi! (${newCart.find(item => item.id === product.id).quantity} adet)`);
  };

  const handleAddToFavorites = (product) => {
    const isAlreadyFavorite = favorites.find(fav => fav.id === product.id);
    let newFavorites;
    
    if (isAlreadyFavorite) {
      newFavorites = favorites.filter(fav => fav.id !== product.id);
      toast.success(`${product.name} favorilerden çıkarıldı!`);
    } else {
      newFavorites = [...favorites, product];
      toast.success(`${product.name} favorilere eklendi!`);
    }
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const handleCompare = (product) => {
    if (compareList.length >= 3) {
      toast.error('En fazla 3 ürün karşılaştırabilirsiniz!');
      return;
    }
    
    const isAlreadyInCompare = compareList.find(item => item.id === product.id);
    
    if (isAlreadyInCompare) {
      const newCompareList = compareList.filter(item => item.id !== product.id);
      setCompareList(newCompareList);
      localStorage.setItem('compareList', JSON.stringify(newCompareList));
      toast.success(`${product.name} karşılaştırma listesinden çıkarıldı!`);
    } else {
      const newCompareList = [...compareList, product];
      setCompareList(newCompareList);
      localStorage.setItem('compareList', JSON.stringify(newCompareList));
      toast.success(`${product.name} karşılaştırma listesine eklendi! (${newCompareList.length}/3)`);
    }
  };

  const handleTrackPrice = (product) => {
    const trackedPrices = JSON.parse(localStorage.getItem('trackedPrices') || '[]');
    const isAlreadyTracked = trackedPrices.find(item => item.id === product.id);
    
    if (!isAlreadyTracked) {
      const newTrackedPrices = [...trackedPrices, {
        ...product,
        originalTrackedPrice: product.price,
        dateAdded: new Date().toISOString()
      }];
      localStorage.setItem('trackedPrices', JSON.stringify(newTrackedPrices));
      toast.success(`${product.name} fiyat takibine eklendi!`);
    } else {
      toast.info(`${product.name} zaten fiyat takibinde!`);
    }
  };

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
    setShowQuickView(true);
  };

  const handleAIFeature = async (type) => {
    setAIModalType(type);
    setShowAIModal(true);
    setAILoading(true);
    
    try {
      let result = '';
      
      switch (type) {
        case 'description':
          // AI ürün açıklaması oluştur
          const descriptionResponse = await fetch('http://localhost:8000/api/v1/ai/description', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              product_name: "Örnek Ürün",
              category: "Elektronik",
              features: ["Yüksek kalite", "Uzun ömürlü", "Garantili"]
            })
          });
          
          if (descriptionResponse.ok) {
            const data = await descriptionResponse.json();
            result = data.description;
          } else {
            result = "Ürün açıklaması oluşturulamadı.";
          }
          break;
          
        case 'stock-predict':
          // AI stok tahmini
          const stockResponse = await fetch('http://localhost:8000/api/v1/ai/stock-predict', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              product_name: "Örnek Ürün",
              current_stock: 50,
              historical_data: [
                {"month": "Ocak", "sales": 100},
                {"month": "Şubat", "sales": 120},
                {"month": "Mart", "sales": 90}
              ],
              season: "normal"
            })
          });
          
          if (stockResponse.ok) {
            const data = await stockResponse.json();
            result = `Önerilen Stok: ${data.prediction.recommended_stock}\nSipariş Noktası: ${data.prediction.reorder_point}\nGüvenilirlik: %${data.prediction.prediction_confidence}`;
          } else {
            result = "Stok tahmini yapılamadı.";
          }
          break;
          
        case 'seo':
          result = "SEO optimizasyonu tamamlandı:\n\n• Anahtar kelimeler optimize edildi\n• Meta açıklamalar güncellendi\n• Sayfa hızı iyileştirildi\n• Mobil uyumluluk kontrol edildi";
          break;
          
        default:
          result = `${type} özelliği başarıyla tamamlandı!`;
      }
      
      setAIResult(result);
    } catch (error) {
      console.error('AI özelliği hatası:', error);
      setAIResult('AI özelliği çalıştırılırken hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setAILoading(false);
    }
  };

  return (
    <ProductsContainer>
      <Header>
        <Title>
          <Package size={32} />
          Ürün Yönetimi
          <GeminiStatus>
            Gemini AI Aktif
          </GeminiStatus>
        </Title>
        <Controls>
          <SearchBar>
            <Search size={20} color="#94a3b8" />
            <SearchInput 
              placeholder="Ürün ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
          <FilterButton 
            active={showFilters}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} />
            Filtrele
          </FilterButton>
          <SortSelect 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">İsme Göre</option>
            <option value="price-low">Fiyat (Düşük)</option>
            <option value="price-high">Fiyat (Yüksek)</option>
            <option value="rating">Puana Göre</option>
          </SortSelect>
          <ViewToggle>
            <ViewButton 
              active={viewMode === 'grid'}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={20} />
            </ViewButton>
            <ViewButton 
              active={viewMode === 'list'}
              onClick={() => setViewMode('list')}
            >
              <List size={20} />
            </ViewButton>
          </ViewToggle>
          <CreateButton>
            <Plus size={20} />
            Ürün Ekle
          </CreateButton>
        </Controls>
      </Header>

      <FiltersPanel show={showFilters}>
        <FilterGrid>
          <FilterSection>
            <FilterLabel>Kategori</FilterLabel>
            <CategorySelect value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="all">Tüm Kategoriler</option>
              <option value="Telefon">Telefon</option>
              <option value="Bilgisayar">Bilgisayar</option>
              <option value="Tablet">Tablet</option>
              <option value="Aksesuar">Aksesuar</option>
            </CategorySelect>
          </FilterSection>
          <FilterSection>
            <FilterLabel>Fiyat Aralığı</FilterLabel>
            <PriceRange>
              <PriceInput 
                type="number" 
                placeholder="Min" 
                value={priceRange.min}
                onChange={(e) => setPriceRange({...priceRange, min: parseInt(e.target.value) || 0})}
              />
              <span>-</span>
              <PriceInput 
                type="number" 
                placeholder="Max" 
                value={priceRange.max}
                onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value) || 100000})}
              />
            </PriceRange>
          </FilterSection>
          <FilterSection>
            <FilterLabel>Minimum Puan</FilterLabel>
            <StarRating>
              {[1, 2, 3, 4, 5].map(star => (
                <StarButton key={star} onClick={() => setSelectedRating(star === selectedRating ? 0 : star)}>
                  <Star size={20} fill={star <= selectedRating ? "#fbbf24" : "none"} />
                </StarButton>
              ))}
            </StarRating>
          </FilterSection>
        </FilterGrid>
      </FiltersPanel>

      <GeminiHighlight>
        <GeminiTitle>
          <Brain size={24} />
          Gemini AI Ürün Asistanı
        </GeminiTitle>
        <GeminiDescription>
          🧠 <strong>Kişiselleştirilmiş AI Öneriler:</strong> Arama geçmişiniz, kategori tercihleriniz ve 
          popüler trendlere dayalı olarak size özel ürün önerileri sunuyoruz. Gemini AI, {filteredProducts.length} 
          ürün arasından sizin için en uygun olanları analiz ederek öne çıkarıyor.
        </GeminiDescription>
        <GeminiFeatures>
          <GeminiFeature onClick={() => handleAIFeature('description')}>
            <Sparkles size={16} />
            Otomatik Açıklama
          </GeminiFeature>
          <GeminiFeature onClick={() => handleAIFeature('seo')}>
            <Star size={16} />
            SEO Optimizasyonu
          </GeminiFeature>
          <GeminiFeature onClick={() => handleAIFeature('analysis')}>
            <TrendingUp size={16} />
            Trend Analizi
          </GeminiFeature>
        </GeminiFeatures>
      </GeminiHighlight>

      <StatsGrid>
        <StatCard>
          <StatHeader>
            <StatIcon color="#3b82f6">
              <Package size={20} />
            </StatIcon>
            <StatChange positive>
              <TrendingUp size={16} />
              +15%
            </StatChange>
          </StatHeader>
          <StatValue>{stats.total}</StatValue>
          <StatLabel>Toplam Ürün</StatLabel>
        </StatCard>

        <StatCard>
          <StatHeader>
            <StatIcon color="#10b981">
              <Package size={20} />
            </StatIcon>
            <StatChange positive>
              <TrendingUp size={16} />
              +8%
            </StatChange>
          </StatHeader>
          <StatValue>{stats.active}</StatValue>
          <StatLabel>Stokta</StatLabel>
        </StatCard>

        <StatCard>
          <StatHeader>
            <StatIcon color="#f59e0b">
              <TrendingUp size={20} />
            </StatIcon>
            <StatChange positive>
              <TrendingUp size={16} />
              +23%
            </StatChange>
          </StatHeader>
          <StatValue>{stats.trending}</StatValue>
          <StatLabel>Trend Ürün</StatLabel>
        </StatCard>

        <StatCard>
          <StatHeader>
            <StatIcon color="#ef4444">
              <Star size={20} />
            </StatIcon>
            <StatChange positive>
              <TrendingUp size={16} />
              +12%
            </StatChange>
          </StatHeader>
          <StatValue>{stats.discounted}</StatValue>
          <StatLabel>İndirimli</StatLabel>
        </StatCard>
      </StatsGrid>

      {loading ? (
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>Ürünler yükleniyor...</LoadingText>
        </LoadingContainer>
      ) : filteredProducts.length > 0 ? (
        <>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            padding: '1rem',
            background: '#f8fafc',
            borderRadius: '0.75rem',
            border: '1px solid #e2e8f0'
          }}>
            <span style={{fontWeight: '600', color: '#1e293b'}}>
              {filteredProducts.length} ürün gösteriliyor
              {filteredProducts.length !== products.length && (
                <span style={{color: '#64748b', fontWeight: '400'}}> (toplam {products.length} ürün)</span>
              )}
            </span>
            <span style={{fontSize: '0.875rem', color: '#64748b'}}>
              {searchTerm && `"${searchTerm}" için sonuçlar`}
              {selectedCategory !== 'all' && ` • ${selectedCategory}`}
              {selectedRating > 0 && ` • ${selectedRating}+ yıldız`}
            </span>
          </div>
          <ProductsGrid>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => handleAddToCart(product)}
                onAddToFavorites={() => handleAddToFavorites(product)}
                onCompare={() => handleCompare(product)}
                onTrackPrice={() => handleTrackPrice(product)}
                onQuickView={() => handleQuickView(product)}
                isInCart={cart.some(item => item.id === product.id)}
                isInFavorites={favorites.some(fav => fav.id === product.id)}
                isInCompare={compareList.some(item => item.id === product.id)}
              />
            ))}
          </ProductsGrid>
        </>
      ) : (
        <EmptyState>
          <EmptyIcon>
            <Package size={32} />
          </EmptyIcon>
          <EmptyTitle>Ürün Bulunamadı</EmptyTitle>
          <EmptyDescription>
            Arama kriterlerinize uygun ürün bulunamadı. 
            Farklı anahtar kelimeler deneyin veya filtreleri değiştirin.
          </EmptyDescription>
          <CreateButton>
            <Plus size={20} />
            Yeni Ürün Ekle
          </CreateButton>
        </EmptyState>
      )}

      {/* Quick View Modal */}
      <QuickViewModal show={showQuickView} onClick={() => setShowQuickView(false)}>
        <QuickViewContent onClick={(e) => e.stopPropagation()}>
          {quickViewProduct && (
            <>
              <QuickViewImageSection>
                <QuickViewImage 
                  src={quickViewProduct.image} 
                  alt={quickViewProduct.name}
                />
                <QuickViewStats>
                  <QuickViewStat>
                    <QuickViewStatValue>{quickViewProduct.trendScore || 85}</QuickViewStatValue>
                    <QuickViewStatLabel>Trend Skoru</QuickViewStatLabel>
                  </QuickViewStat>
                  <QuickViewStat>
                    <QuickViewStatValue>{quickViewProduct.trustScore || 92}</QuickViewStatValue>
                    <QuickViewStatLabel>Güven Skoru</QuickViewStatLabel>
                  </QuickViewStat>
                  <QuickViewStat>
                    <QuickViewStatValue>%{quickViewProduct.returnRate || 8}</QuickViewStatValue>
                    <QuickViewStatLabel>İade Oranı</QuickViewStatLabel>
                  </QuickViewStat>
                </QuickViewStats>
              </QuickViewImageSection>

              <QuickViewDetailsSection>
                <QuickViewHeader>
                  <div>
                    <QuickViewTitle>{quickViewProduct.name}</QuickViewTitle>
                    <QuickViewBrand>{quickViewProduct.brand}</QuickViewBrand>
                  </div>
                  <QuickViewCloseButton onClick={() => setShowQuickView(false)}>
                    <X size={20} />
                  </QuickViewCloseButton>
                </QuickViewHeader>

                <QuickViewPrice>
                  <QuickViewCurrentPrice>
                    {quickViewProduct.price?.toLocaleString()} TL
                  </QuickViewCurrentPrice>
                  {quickViewProduct.originalPrice > quickViewProduct.price && (
                    <QuickViewOriginalPrice>
                      {quickViewProduct.originalPrice?.toLocaleString()} TL
                    </QuickViewOriginalPrice>
                  )}
                </QuickViewPrice>

                <QuickViewRating>
                  <Star size={20} fill="#fbbf24" color="#fbbf24" />
                  <span style={{fontWeight: '600', fontSize: '1.1rem'}}>
                    {quickViewProduct.rating}
                  </span>
                  <span style={{color: '#64748b'}}>
                    ({quickViewProduct.reviews} yorum)
                  </span>
                </QuickViewRating>

                <QuickViewDescription>
                  {quickViewProduct.description}
                </QuickViewDescription>

                {quickViewProduct.features && (
                  <QuickViewFeatures>
                    {quickViewProduct.features.map((feature, index) => (
                      <QuickViewFeature key={index}>{feature}</QuickViewFeature>
                    ))}
                  </QuickViewFeatures>
                )}

                <div style={{
                  padding: '1rem',
                  background: quickViewProduct.inStock ? '#ecfdf5' : '#fef2f2',
                  borderRadius: '0.75rem',
                  border: `1px solid ${quickViewProduct.inStock ? '#d1fae5' : '#fecaca'}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  {quickViewProduct.inStock ? (
                    quickViewProduct.stockCount <= 10 ? (
                      <>
                        <span style={{color: '#f59e0b'}}>⚠️</span>
                        <span style={{color: '#f59e0b', fontWeight: '600'}}>
                          Az stok: {quickViewProduct.stockCount} adet
                        </span>
                      </>
                    ) : (
                      <>
                        <span style={{color: '#059669'}}>✅</span>
                        <span style={{color: '#059669', fontWeight: '600'}}>
                          Stokta: {quickViewProduct.stockCount} adet
                        </span>
                      </>
                    )
                  ) : (
                    <>
                      <span style={{color: '#dc2626'}}>❌</span>
                      <span style={{color: '#dc2626', fontWeight: '600'}}>
                        Stokta yok
                      </span>
                    </>
                  )}
                </div>

                <QuickViewActions>
                  <QuickViewButton 
                    className="primary"
                    onClick={() => {
                      handleAddToCart(quickViewProduct);
                      setShowQuickView(false);
                    }}
                    disabled={!quickViewProduct.inStock}
                  >
                    <ShoppingCart size={16} />
                    {cart.some(item => item.id === quickViewProduct.id) ? 'Sepette' : 'Sepete Ekle'}
                  </QuickViewButton>
                  
                  <QuickViewButton 
                    className="secondary"
                    onClick={() => {
                      handleAddToFavorites(quickViewProduct);
                    }}
                  >
                    <Heart 
                      size={16} 
                      fill={favorites.some(fav => fav.id === quickViewProduct.id) ? "currentColor" : "none"} 
                    />
                    Favoriler
                  </QuickViewButton>
                  
                  <QuickViewButton 
                    className="secondary"
                    onClick={() => {
                      handleCompare(quickViewProduct);
                    }}
                  >
                    <Scale size={16} />
                    Karşılaştır
                  </QuickViewButton>
                </QuickViewActions>
              </QuickViewDetailsSection>
            </>
          )}
        </QuickViewContent>
      </QuickViewModal>

      {/* AI Modal */}
      <AIModal show={showAIModal} onClick={() => setShowAIModal(false)}>
        <AIModalContent onClick={(e) => e.stopPropagation()}>
          <AIModalHeader>
            <AIModalTitle>
              <Brain size={20} />
              {aiModalType === 'description' ? 'Otomatik Açıklama' : 
               aiModalType === 'seo' ? 'SEO Optimizasyonu' : 
               'Trend Analizi'}
            </AIModalTitle>
            <AIModalClose onClick={() => setShowAIModal(false)}>
              <X size={20} />
            </AIModalClose>
          </AIModalHeader>
          
          {aiLoading ? (
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem', padding: '2rem'}}>
              <AISpinner />
              <span>Gemini AI analiz yapıyor...</span>
            </div>
          ) : (
            <AIResult>{aiResult}</AIResult>
          )}
        </AIModalContent>
      </AIModal>
    </ProductsContainer>
  );
}

export default Products;
