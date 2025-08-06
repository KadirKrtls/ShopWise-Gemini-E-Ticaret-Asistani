import React, { useState, useRef, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { 
  Search as SearchIcon, 
  TrendingUp, 
  Sparkles, 
  Mic, 
  Camera,
  Brain,
  Zap,
  Star,
  Filter,
  Image as ImageIcon,
  Smartphone,
  Laptop,
  Package,
  Footprints,
  AlertCircle,
  Loader
} from 'lucide-react';
import { useMutation } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../contexts/AuthContext';

// Animasyonlar
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
  40%, 43% { transform: translate3d(0, -8px, 0); }
  70% { transform: translate3d(0, -4px, 0); }
  90% { transform: translate3d(0, -2px, 0); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Ana Container
const SearchContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-lg);
  animation: ${css`${fadeIn} 0.8s ease-out`};
`;

// Header
const Header = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-xl);
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, var(--text-primary) 0%, var(--primary-blue) 50%, var(--primary-orange) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: var(--spacing-md);
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: var(--text-secondary);
  font-weight: 500;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
`;

// AI Destekli Arama Bölümü
const AISearchSection = styled.div`
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-xl);
  border: 1px solid var(--medium-gray);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-blue), var(--primary-orange), var(--primary-green));
  }
`;

const SearchForm = styled.form`
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInputField = styled.input`
  width: 100%;
  padding: var(--spacing-lg) var(--spacing-lg) var(--spacing-lg) 3.5rem;
  border: 2px solid var(--medium-gray);
  border-radius: var(--radius-lg);
  font-size: 16px;
  background: var(--light-gray);
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-blue);
    background: var(--white);
    box-shadow: 0 0 0 3px rgba(30, 136, 229, 0.1);
  }
  
  &::placeholder {
    color: var(--text-muted);
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: var(--spacing-md);
  color: var(--text-muted);
  z-index: 1;
`;

const AIIndicator = styled.div`
  position: absolute;
  right: var(--spacing-md);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--primary-blue);
  font-size: 12px;
  font-weight: 600;
`;

const SearchButton = styled.button`
  padding: var(--spacing-lg) var(--spacing-xl);
  background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
  color: var(--white);
  border: none;
  border-radius: var(--radius-lg);
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  min-width: 140px;
  justify-content: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    animation: ${css`${bounce} 1s`};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    animation: none;
  }
`;

const LoadingSpinner = styled.div`
  animation: ${css`${spin} 1s linear infinite`};
`;

// Akıllı Aksiyonlar
const SmartActions = styled.div`
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  margin-bottom: var(--spacing-lg);
`;

const ActionButton = styled.button`
  padding: var(--spacing-md) var(--spacing-lg);
  border: 2px solid var(--medium-gray);
  background: var(--white);
  color: var(--text-secondary);
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: 14px;
  
  &:hover {
    border-color: var(--primary-blue);
    color: var(--primary-blue);
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }
  
  &.active {
    background: var(--primary-blue);
    color: var(--white);
    border-color: var(--primary-blue);
  }
  
  &.listening {
    background: var(--error);
    color: var(--white);
    border-color: var(--error);
    animation: ${css`${pulse} 1.5s infinite`};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

// Autocomplete Dropdown
const AutocompleteDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--white);
  border: 1px solid var(--medium-gray);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
  margin-top: var(--spacing-xs);
`;

const AutocompleteItem = styled.div`
  padding: var(--spacing-md);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  transition: background-color 0.2s ease;
  
  &:hover {
    background: var(--light-gray);
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid var(--light-gray);
  }
`;

const AutocompleteIcon = styled.div`
  color: var(--primary-blue);
  font-size: 16px;
`;

const AutocompleteText = styled.div`
  flex: 1;
`;

const AutocompleteType = styled.div`
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
`;

// Akıllı Filtreler
const SmartFilters = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

const FilterLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
`;

const FilterInput = styled.input`
  padding: var(--spacing-md);
  border: 1px solid var(--medium-gray);
  border-radius: var(--radius-sm);
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-blue);
    box-shadow: 0 0 0 2px rgba(30, 136, 229, 0.1);
  }
`;

// Akıllı Öneriler
const SmartSuggestions = styled.div`
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--medium-gray);
  animation: ${css`${slideIn} 0.6s ease-out 0.3s both`};
`;

const SuggestionsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
`;

const SuggestionsTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

const SuggestionsCount = styled.span`
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
`;

const SuggestionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
`;

const SuggestionCard = styled.div`
  background: var(--light-gray);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--medium-gray);
  
  &:hover {
    background: var(--white);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: var(--primary-blue);
  }
`;

const SuggestionIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-sm);
  color: var(--white);
  font-size: 18px;
`;

const SuggestionText = styled.div`
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
  font-size: 16px;
`;

const SuggestionType = styled.div`
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// Trend Bölümü
const TrendingSection = styled.div`
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--medium-gray);
  animation: ${css`${slideIn} 0.6s ease-out 0.6s both`};
`;

const TrendingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
`;

const TrendingTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

const TrendingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
`;

const TrendingCard = styled.div`
  background: var(--light-gray);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  border-left: 4px solid var(--primary-blue);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

const TrendingProduct = styled.div`
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  font-size: 16px;
`;

const TrendingPrice = styled.div`
  color: var(--primary-blue);
  font-weight: 700;
  font-size: 18px;
  margin-bottom: var(--spacing-xs);
`;

const TrendingScore = styled.div`
  font-size: 12px;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
`;

// Sonuçlar Bölümü
const ResultsContainer = styled.div`
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--medium-gray);
  animation: ${css`${slideIn} 0.6s ease-out 0.9s both`};
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
  gap: var(--spacing-md);
`;

const ResultsTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

const ResultsStats = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  font-size: 14px;
  color: var(--text-secondary);
`;

const ResultsCount = styled.span`
  font-weight: 600;
  color: var(--primary-blue);
`;

const ResultsSource = styled.span`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--light-gray);
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 500;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Loading States
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl);
  color: var(--text-secondary);
`;

const LoadingSpinnerLarge = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid var(--light-gray);
  border-top: 3px solid var(--primary-blue);
  border-radius: 50%;
  animation: ${css`${spin} 1s linear infinite`};
  margin-bottom: var(--spacing-md);
`;

const LoadingText = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: var(--spacing-sm);
`;

const LoadingSubtext = styled.div`
  font-size: 14px;
  color: var(--text-muted);
`;

// Empty State
const EmptyState = styled.div`
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--text-secondary);
`;

const EmptyIcon = styled.div`
  width: 80px;
  height: 80px;
  background: var(--light-gray);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-lg);
  color: var(--text-muted);
  font-size: 32px;
`;

const EmptyTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
`;

const EmptyText = styled.p`
  font-size: 16px;
  color: var(--text-secondary);
  max-width: 400px;
  margin: 0 auto;
  line-height: 1.5;
`;

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // Authentication durumuna göre gelişmiş özellikler (kullanılacak)
  const canUseAdvancedFeatures = () => {
    return isAuthenticated;
  };
  
  // Gelişmiş özellikler durumu (kullanılacak)
  const hasAdvancedAccess = canUseAdvancedFeatures();
  console.log('Advanced access:', hasAdvancedAccess); // Demo için log

  // Debounced search for autocomplete
  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (query.length < 2) {
        setAutocompleteResults([]);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8000/api/v1/search/autocomplete?q=${encodeURIComponent(query)}`);
        setAutocompleteResults(response.data.suggestions || []);
      } catch (error) {
        // Fallback to mock suggestions
        const mockSuggestions = generateMockSuggestions(query);
        setAutocompleteResults(mockSuggestions);
      }
    }, 300),
    []
  );

  // Debounce utility
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Generate mock suggestions
  const generateMockSuggestions = (query) => {
    const suggestions = [
      { text: `${query} en uygun fiyat`, type: 'Fiyat Önerisi', icon: '💰' },
      { text: `${query} marka seçenekleri`, type: 'Marka', icon: '🏷️' },
      { text: `${query} kategorisi`, type: 'Kategori', icon: '📂' },
      { text: `${query} benzer ürünler`, type: 'Benzer', icon: '🔄' },
      { text: `${query} en çok satan`, type: 'Trend', icon: '🔥' }
    ];
    return suggestions.slice(0, 5);
  };

  // AI-powered search mutation
  const searchMutation = useMutation({
    mutationFn: async (searchData) => {
      setIsAnalyzing(true);
      
      try {
        // Try real API first
        const realApiResponse = await fetch(`http://localhost:8000/api/v1/ecommerce/search?q=${encodeURIComponent(searchData.query)}&limit=25`);
        if (realApiResponse.ok) {
          const realApiData = await realApiResponse.json();
          if (realApiData.products && realApiData.products.length > 0) {
            return { 
              products: realApiData.products, 
              total_results: realApiData.products.length,
              source: `AI Destekli Arama (${realApiData.source})`,
              ai_analysis: true
            };
          }
        }
        
        // Fallback to AI analysis
        const aiResponse = await axios.post('http://localhost:8000/api/v1/search/natural-language', {
          query: searchData.query,
          category: searchData.category,
          min_price: searchData.min_price,
          max_price: searchData.max_price,
          brand: searchData.brand
        });
        
        return { 
          ...aiResponse.data, 
          source: 'Gemini AI Analizi',
          ai_analysis: true
        };
      } catch (error) {
        // Final fallback to mock data
        console.warn('AI API hatası, mock data kullanılıyor:', error);
        const mockResults = generateMockProducts(searchData.query);
        return { 
          products: mockResults, 
          total_results: mockResults.length,
          source: 'Mock AI Analizi',
          ai_analysis: false
        };
      } finally {
        setIsAnalyzing(false);
      }
    },
    onSuccess: (data) => {
      setSearchResults(data.products || []);
      setShowResults(true);
      
      // Add to search history
      const newHistory = [searchQuery, ...searchHistory.filter(item => item !== searchQuery)].slice(0, 5);
      setSearchHistory(newHistory);
      
      toast.success(`${data.total_results || 0} ürün bulundu! ${data.ai_analysis ? '🤖 AI analizi ile' : '📊 Standart arama ile'}`);
    },
    onError: (error) => {
      toast.error('Arama yapılamadı. Lütfen tekrar deneyin.');
      console.error('Arama hatası:', error);
    }
  });

  // Generate mock products
  const generateMockProducts = (query) => {
    const categories = {
      'telefon': [
        { name: 'iPhone 15 Pro', price: 45000, brand: 'Apple', rating: 4.8 },
        { name: 'Samsung Galaxy S24', price: 38000, brand: 'Samsung', rating: 4.7 },
        { name: 'Xiaomi 14', price: 32000, brand: 'Xiaomi', rating: 4.6 }
      ],
      'ayakkabı': [
        { name: 'Nike Air Max', price: 1200, brand: 'Nike', rating: 4.5 },
        { name: 'Adidas Ultraboost', price: 1500, brand: 'Adidas', rating: 4.6 },
        { name: 'Puma RS-X', price: 900, brand: 'Puma', rating: 4.4 }
      ],
      'laptop': [
        { name: 'MacBook Pro M3', price: 65000, brand: 'Apple', rating: 4.9 },
        { name: 'Dell XPS 13', price: 45000, brand: 'Dell', rating: 4.7 },
        { name: 'Lenovo ThinkPad', price: 38000, brand: 'Lenovo', rating: 4.6 }
      ]
    };

    const queryLower = query.toLowerCase();
    let products = [];

    if (queryLower.includes('telefon') || queryLower.includes('phone')) {
      products = categories.telefon;
    } else if (queryLower.includes('ayakkabı') || queryLower.includes('shoe')) {
      products = categories.ayakkabı;
    } else if (queryLower.includes('laptop') || queryLower.includes('bilgisayar')) {
      products = categories.laptop;
    } else {
      // Mix of products
      products = [...categories.telefon, ...categories.ayakkabı, ...categories.laptop];
    }

    return products.map((product, index) => ({
      id: index + 1,
      ...product,
      image: `https://via.placeholder.com/300x300?text=${encodeURIComponent(product.name)}`,
      description: `${product.brand} ${product.name} - En iyi fiyat garantisi`,
      reviews: Math.floor(Math.random() * 1000) + 100,
      inStock: true,
      stockCount: Math.floor(Math.random() * 50) + 10,
      discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : 0,
      originalPrice: product.price * (1 + (Math.random() * 0.3))
    }));
  };

  // Handle search input changes
  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length > 1) {
      setShowAutocomplete(true);
      debouncedSearch(value);
    } else {
      setShowAutocomplete(false);
      setAutocompleteResults([]);
    }
  };

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error('Lütfen bir arama sorgusu girin.');
      return;
    }

    setShowAutocomplete(false);
    const searchData = {
      query: searchQuery,
      category: category || undefined,
      min_price: minPrice ? parseFloat(minPrice) : undefined,
      max_price: maxPrice ? parseFloat(maxPrice) : undefined,
      brand: brand || undefined
    };

    searchMutation.mutate(searchData);
  };

  // Handle autocomplete selection
  const handleAutocompleteSelect = (suggestion) => {
    setSearchQuery(suggestion.text);
    setShowAutocomplete(false);
    
    // Auto-search with selected suggestion
    const searchData = {
      query: suggestion.text,
      category: category || undefined,
      min_price: minPrice ? parseFloat(minPrice) : undefined,
      max_price: maxPrice ? parseFloat(maxPrice) : undefined,
      brand: brand || undefined
    };
    
    searchMutation.mutate(searchData);
  };

  // Voice search function
  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error('Tarayıcınız sesli arama desteklemiyor.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'tr-TR';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      toast.success('🎤 Dinliyorum... Konuşmaya başlayın!');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      toast.success(`🎯 "${transcript}" olarak algılandı`);
      
      // Auto-search with voice input
      setTimeout(() => {
        const searchData = {
          query: transcript,
          category: category || undefined,
          min_price: minPrice ? parseFloat(minPrice) : undefined,
          max_price: maxPrice ? parseFloat(maxPrice) : undefined,
          brand: brand || undefined
        };
        searchMutation.mutate(searchData);
      }, 500);
    };

    recognition.onerror = (event) => {
      toast.error('❌ Sesli arama hatası: ' + event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Image search function
  const handleImageSearch = (file) => {
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast.error('Lütfen bir resim dosyası seçin.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Resim dosyası çok büyük. Maksimum 5MB olmalı.');
      return;
    }

    setSelectedImage(file);
    setIsAnalyzing(true);
    
    toast.loading('🔍 Resim analiz ediliyor...');
    
    setTimeout(() => {
      toast.dismiss();
      
      // AI-powered image analysis
      const imageAnalysis = analyzeImage(file);
      setSearchQuery(imageAnalysis.query);
      
      toast.success(`🤖 AI Analizi: "${imageAnalysis.query}"`);
      
      // Auto-search with image analysis
      const searchData = {
        query: imageAnalysis.query,
        category: imageAnalysis.category || category || undefined
      };
      searchMutation.mutate(searchData);
    }, 2000);
  };

  // Mock image analysis
  const analyzeImage = (file) => {
    const fileName = file.name.toLowerCase();
    const analyses = {
      'phone': { query: 'akıllı telefon', category: 'Telefon' },
      'laptop': { query: 'dizüstü bilgisayar', category: 'Bilgisayar' },
      'shoe': { query: 'spor ayakkabı', category: 'Ayakkabı' },
      'shirt': { query: 'tişört', category: 'Giyim' },
      'watch': { query: 'saat', category: 'Aksesuar' },
      'book': { query: 'kitap', category: 'Kitap' },
      'game': { query: 'oyun konsolu', category: 'Elektronik' }
    };

    for (const [key, analysis] of Object.entries(analyses)) {
      if (fileName.includes(key)) {
        return analysis;
      }
    }

    // Default analysis
    return { query: 'elektronik ürün', category: 'Elektronik' };
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleImageSearch(file);
    }
  };

  // Quick suggestions
  const quickSuggestions = [
    { text: '500 TL altında spor ayakkabı', type: 'Fiyat Filtresi', icon: <Footprints size={16} /> },
    { text: 'iPhone 15 Pro', type: 'Ürün Adı', icon: <Smartphone size={16} /> },
    { text: 'Samsung', type: 'Marka', icon: <Star size={16} /> },
    { text: 'Spor Ayakkabı', type: 'Kategori', icon: <Footprints size={16} /> },
    { text: '1000 TL üstü telefon', type: 'Fiyat Filtresi', icon: <Smartphone size={16} /> },
    { text: 'Nike', type: 'Marka', icon: <Star size={16} /> },
    { text: 'Laptop', type: 'Kategori', icon: <Laptop size={16} /> },
    { text: 'Giyim', type: 'Kategori', icon: <Package size={16} /> }
  ];

  // Trending products
  const trendingProducts = [
    { name: 'iPhone 15 Pro', price: 45000, trendScore: 98, category: 'Telefon' },
    { name: 'Nike Air Max', price: 1200, trendScore: 95, category: 'Ayakkabı' },
    { name: 'MacBook Pro M3', price: 65000, trendScore: 92, category: 'Bilgisayar' },
    { name: 'Samsung Galaxy S24', price: 38000, trendScore: 89, category: 'Telefon' },
    { name: 'Adidas Ultraboost', price: 1500, trendScore: 87, category: 'Ayakkabı' },
    { name: 'Dell XPS 13', price: 45000, trendScore: 85, category: 'Bilgisayar' }
  ];

  // Product actions
  const handleAddToCart = (product) => {
    toast.success(`🛒 ${product.name} sepete eklendi!`);
  };

  const handleAddToFavorites = (product) => {
    toast.success(`❤️ ${product.name} favorilere eklendi!`);
  };

  const handleProductClick = (product) => {
    toast.success(`👁️ ${product.name} detayları açılıyor...`);
    navigate(`/products/${product.id}`);
  };

  return (
    <SearchContainer>
      <Header>
        <Title>🤖 Akıllı Arama</Title>
        <Subtitle>
          Gemini AI destekli doğal dil arama, sesli arama ve görsel arama ile 
          en uygun ürünleri bulun
        </Subtitle>
      </Header>

      <AISearchSection>
        <SearchForm onSubmit={handleSearch}>
          <SearchInput>
            <SearchIconWrapper>
              <SearchIcon size={20} />
            </SearchIconWrapper>
            <SearchInputField
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Örn: 500 TL altında siyah spor ayakkabı öner..."
              onFocus={() => setShowAutocomplete(true)}
            />
            <AIIndicator>
              <Brain size={14} />
              AI
            </AIIndicator>
          </SearchInput>
          <SearchButton type="submit" disabled={searchMutation.isLoading || isAnalyzing}>
            {searchMutation.isLoading || isAnalyzing ? (
              <>
                <LoadingSpinner>
                  <Loader size={16} />
                </LoadingSpinner>
                {isAnalyzing ? 'Analiz...' : 'Aranıyor...'}
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Akıllı Ara
              </>
            )}
          </SearchButton>
        </SearchForm>

        {showAutocomplete && autocompleteResults.length > 0 && (
          <AutocompleteDropdown>
            {autocompleteResults.map((suggestion, index) => (
              <AutocompleteItem 
                key={index} 
                onClick={() => handleAutocompleteSelect(suggestion)}
              >
                <AutocompleteIcon>{suggestion.icon}</AutocompleteIcon>
                <AutocompleteText>{suggestion.text}</AutocompleteText>
                <AutocompleteType>{suggestion.type}</AutocompleteType>
              </AutocompleteItem>
            ))}
          </AutocompleteDropdown>
        )}

        <SmartActions>
          <ActionButton
            type="button"
            onClick={handleVoiceSearch}
            disabled={isListening || searchMutation.isLoading}
            className={isListening ? 'listening' : ''}
          >
            <Mic size={16} />
            {isListening ? 'Dinliyorum...' : 'Sesli Arama'}
          </ActionButton>
          
          <ActionButton
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={searchMutation.isLoading}
          >
            <Camera size={16} />
            Görsel Arama
          </ActionButton>
          
          <HiddenFileInput
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
          />
          
          {selectedImage && (
            <ActionButton
              type="button"
              onClick={() => setSelectedImage(null)}
            >
              <ImageIcon size={16} />
              {selectedImage.name.substring(0, 20)}...
            </ActionButton>
          )}
        </SmartActions>

        <SmartFilters>
          <FilterGroup>
            <FilterLabel>
              <Filter size={14} />
              Kategori
            </FilterLabel>
            <FilterInput
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Kategori"
            />
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel>
              <TrendingUp size={14} />
              Min Fiyat
            </FilterLabel>
            <FilterInput
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min TL"
            />
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel>
              <TrendingUp size={14} />
              Max Fiyat
            </FilterLabel>
            <FilterInput
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max TL"
            />
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel>
              <Star size={14} />
              Marka
            </FilterLabel>
            <FilterInput
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Marka"
            />
          </FilterGroup>
        </SmartFilters>
      </AISearchSection>

      <SmartSuggestions>
        <SuggestionsHeader>
          <SuggestionsTitle>
            <Zap size={20} />
            Hızlı Öneriler
          </SuggestionsTitle>
          <SuggestionsCount>{quickSuggestions.length} öneri</SuggestionsCount>
        </SuggestionsHeader>
        <SuggestionsGrid>
          {quickSuggestions.map((suggestion, index) => (
            <SuggestionCard key={index} onClick={() => handleAutocompleteSelect(suggestion)}>
              <SuggestionIcon>
                {suggestion.icon}
              </SuggestionIcon>
              <SuggestionText>{suggestion.text}</SuggestionText>
              <SuggestionType>{suggestion.type}</SuggestionType>
            </SuggestionCard>
          ))}
        </SuggestionsGrid>
      </SmartSuggestions>

      <TrendingSection>
        <TrendingHeader>
          <TrendingTitle>
            <TrendingUp size={20} />
            🔥 Trend Ürünler
          </TrendingTitle>
        </TrendingHeader>
        <TrendingGrid>
          {trendingProducts.map((product, index) => (
            <TrendingCard key={index} onClick={() => handleAutocompleteSelect({ text: product.name, type: 'Trend Ürün' })}>
              <TrendingProduct>{product.name}</TrendingProduct>
              <TrendingPrice>{product.price.toLocaleString()} TL</TrendingPrice>
              <TrendingScore>
                <Star size={12} fill="#FBBF24" color="#FBBF24" />
                Trend Skoru: {product.trendScore}%
              </TrendingScore>
            </TrendingCard>
          ))}
        </TrendingGrid>
      </TrendingSection>

      {showResults && searchResults.length > 0 && (
        <ResultsContainer>
          <ResultsHeader>
            <ResultsTitle>
              <SearchIcon size={20} />
              Arama Sonuçları
            </ResultsTitle>
            <ResultsStats>
              <ResultsCount>{searchResults.length} ürün bulundu</ResultsCount>
              <ResultsSource>
                <Brain size={12} />
                {searchMutation.data?.source || 'AI Analizi'}
              </ResultsSource>
            </ResultsStats>
          </ResultsHeader>

          <ProductsGrid>
            {searchResults.map((product) => (
              <div key={product.id} onClick={() => handleProductClick(product)}>
                <ProductCard 
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                  onAddToFavorites={() => handleAddToFavorites(product)}
                />
              </div>
            ))}
          </ProductsGrid>
        </ResultsContainer>
      )}

      {showResults && searchResults.length === 0 && (
        <ResultsContainer>
          <EmptyState>
            <EmptyIcon>
              <AlertCircle size={32} />
            </EmptyIcon>
            <EmptyTitle>Ürün Bulunamadı</EmptyTitle>
            <EmptyText>
              Aradığınız kriterlere uygun ürün bulunamadı. 
              Farklı anahtar kelimeler deneyin veya filtreleri değiştirin.
            </EmptyText>
          </EmptyState>
        </ResultsContainer>
      )}

      {searchMutation.isLoading && (
        <ResultsContainer>
          <LoadingContainer>
            <LoadingSpinnerLarge />
            <LoadingText>AI analiz ediyor...</LoadingText>
            <LoadingSubtext>Gemini AI en uygun sonuçları buluyor</LoadingSubtext>
          </LoadingContainer>
        </ResultsContainer>
      )}
    </SearchContainer>
  );
}

export default Search; 