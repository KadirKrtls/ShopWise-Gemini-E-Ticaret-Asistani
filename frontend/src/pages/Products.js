import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { 
  Plus, 
  Package, 
  Sparkles, 
  Star, 
  TrendingUp,
  Brain,
  Eye,
  Search,
  Filter,
  Grid,
  List
} from 'lucide-react';
import toast from 'react-hot-toast';
import ProductCard from '../components/ProductCard';
import { sampleProducts } from '../data/products';

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
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  animation: ${pulse} 2s infinite;
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
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

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 0.5rem 1rem;
  transition: border-color 0.3s ease;
  
  &:focus-within {
    border-color: #3b82f6;
  }
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 1rem;
  width: 300px;
  
  &::placeholder {
    color: #94a3b8;
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  color: #64748b;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #3b82f6;
    color: #3b82f6;
  }
`;

const ViewToggle = styled.div`
  display: flex;
  background: #f1f5f9;
  border-radius: 0.5rem;
  padding: 0.25rem;
`;

const ViewButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 0.25rem;
  background: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? '#3b82f6' : '#64748b'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #3b82f6;
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
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
    animation: ${pulse} 4s ease-in-out infinite;
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

const GeminiFeature = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  opacity: 0.9;
`;

function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const filteredProducts = sampleProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: sampleProducts.length,
    active: sampleProducts.filter(p => p.inStock).length,
    trending: sampleProducts.filter(p => p.trendScore > 7).length,
    discounted: sampleProducts.filter(p => p.discount > 0).length
  };

  const handleAddToCart = (product) => {
    toast.success(`${product.name} sepete eklendi!`);
  };

  const handleAddToFavorites = (product) => {
    toast.success(`${product.name} favorilere eklendi!`);
  };

  const handleCompare = (product) => {
    toast.success(`${product.name} karşılaştırma listesine eklendi!`);
  };

  const handleTrackPrice = (product) => {
    toast.success(`${product.name} fiyat takibine alındı!`);
  };

  return (
    <ProductsContainer>
      <Header>
        <Title>
          <Package size={32} />
          Ürün Yönetimi
          <GeminiStatus>
            <Brain size={16} />
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
          <FilterButton>
            <Filter size={20} />
            Filtrele
          </FilterButton>
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
            Yeni Ürün
          </CreateButton>
        </Controls>
      </Header>

      <GeminiHighlight>
        <GeminiTitle>
          <Brain size={24} />
          Gemini AI Ürün Asistanı
        </GeminiTitle>
        <GeminiDescription>
          Otomatik ürün açıklaması oluşturma, SEO optimizasyonu ve akıllı kategorilendirme 
          ile ürün yönetiminizi kolaylaştırın.
        </GeminiDescription>
        <GeminiFeatures>
          <GeminiFeature>
            <Sparkles size={16} />
            Otomatik Açıklama
          </GeminiFeature>
          <GeminiFeature>
            <Star size={16} />
            SEO Optimizasyonu
          </GeminiFeature>
          <GeminiFeature>
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
              <Eye size={20} />
            </StatIcon>
            <StatChange positive>
              <TrendingUp size={16} />
              +8%
            </StatChange>
          </StatHeader>
          <StatValue>{stats.active}</StatValue>
          <StatLabel>Stokta Olan</StatLabel>
        </StatCard>

        <StatCard>
          <StatHeader>
            <StatIcon color="#f59e0b">
              <TrendingUp size={20} />
            </StatIcon>
            <StatChange positive>
              <TrendingUp size={16} />
              +22%
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

      {filteredProducts.length > 0 ? (
        <ProductsGrid>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => handleAddToCart(product)}
              onAddToFavorites={() => handleAddToFavorites(product)}
              onCompare={() => handleCompare(product)}
              onTrackPrice={() => handleTrackPrice(product)}
            />
          ))}
        </ProductsGrid>
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
    </ProductsContainer>
  );
}

export default Products; 