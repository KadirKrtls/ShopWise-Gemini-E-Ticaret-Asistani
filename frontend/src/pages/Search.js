import React, { useState } from 'react';
import styled from 'styled-components';
import { Search as SearchIcon, TrendingUp, Filter, Sparkles } from 'lucide-react';
import { useMutation } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const SearchContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 1.125rem;
`;

const SearchSection = styled.div`
  background: white;
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  margin-bottom: 2rem;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
`;

const SearchForm = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const SearchInput = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInputField = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e2e8f0;
  border-radius: 1rem;
  font-size: 1rem;
  background: #f8fafc;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    background: white;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  color: #64748b;
  z-index: 1;
`;

const SearchButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: #2563eb;
  }
  
  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const FilterLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

const FilterInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const ResultsContainer = styled.div`
  background: #f8fafc;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-top: 1rem;
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ResultsTitle = styled.h3`
  font-weight: 600;
  color: #1e293b;
`;

const ResultsCount = styled.span`
  color: #64748b;
  font-size: 0.875rem;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const ProductName = styled.h4`
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const ProductPrice = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 0.5rem;
`;

const ProductCategory = styled.div`
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 0.5rem;
`;

const ProductBrand = styled.div`
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
`;

const SearchParams = styled.div`
  background: #eff6ff;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const ParamsTitle = styled.h4`
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const ParamsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ParamTag = styled.span`
  padding: 0.25rem 0.75rem;
  background: #3b82f6;
  color: white;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
`;

const SuggestionsContainer = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const SuggestionsTitle = styled.h3`
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const SuggestionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const SuggestionCard = styled.div`
  background: #f8fafc;
  border-radius: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #e2e8f0;
  }
`;

const SuggestionText = styled.div`
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 0.25rem;
`;

const SuggestionType = styled.div`
  font-size: 0.875rem;
  color: #64748b;
`;

const TrendingSection = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const TrendingTitle = styled.h3`
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TrendingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const TrendingCard = styled.div`
  background: #f8fafc;
  border-radius: 0.5rem;
  padding: 1rem;
  border-left: 4px solid #3b82f6;
`;

const TrendingProduct = styled.div`
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const TrendingPrice = styled.div`
  color: #3b82f6;
  font-weight: 600;
`;

const TrendingScore = styled.div`
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 0.5rem;
`;

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const searchMutation = useMutation(
    async (searchData) => {
      const response = await axios.post('/api/v1/search/natural-language', searchData);
      return response.data;
    },
    {
      onSuccess: (data) => {
        setSearchResults(data);
        toast.success(`${data.total_results} ürün bulundu!`);
      },
      onError: (error) => {
        toast.error('Arama yapılamadı.');
        console.error('Search error:', error);
      }
    }
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error('Lütfen bir arama sorgusu girin.');
      return;
    }

    const searchData = {
      query: searchQuery,
      category: category || undefined,
      min_price: minPrice ? parseFloat(minPrice) : undefined,
      max_price: maxPrice ? parseFloat(maxPrice) : undefined,
      brand: brand || undefined
    };

    searchMutation.mutate(searchData);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
  };

  const trendingProducts = [
    {
      name: 'Nike Air Max 270',
      price: '899.99 TL',
      score: 95
    },
    {
      name: 'iPhone 15 Pro',
      price: '45,999.99 TL',
      score: 92
    },
    {
      name: 'Samsung Galaxy S24',
      price: '32,999.99 TL',
      score: 88
    }
  ];

  const suggestions = [
    { text: '500 TL altında spor ayakkabı', type: 'Fiyat Filtresi' },
    { text: 'iPhone 15 Pro', type: 'Ürün Adı' },
    { text: 'Samsung', type: 'Marka' },
    { text: 'Spor Ayakkabı', type: 'Kategori' },
    { text: '1000 TL üstü telefon', type: 'Fiyat Filtresi' },
    { text: 'Nike', type: 'Marka' }
  ];

  return (
    <SearchContainer>
      <Header>
        <Title>Akıllı Arama</Title>
        <Subtitle>Doğal dil ile ürün arayın ve Gemini AI destekli sonuçlar alın</Subtitle>
      </Header>

      <SearchSection>
        <SearchForm onSubmit={handleSearch}>
          <SearchInput>
            <SearchIconWrapper>
              <SearchIcon size={20} />
            </SearchIconWrapper>
            <SearchInputField
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Örn: 500 TL altında siyah spor ayakkabı öner..."
            />
          </SearchInput>
          <SearchButton type="submit" disabled={searchMutation.isLoading}>
            {searchMutation.isLoading ? (
              <>
                <Sparkles size={16} />
                Aranıyor...
              </>
            ) : (
              <>
                <SearchIcon size={16} />
                Ara
              </>
            )}
          </SearchButton>
        </SearchForm>

        <FiltersContainer>
          <FilterGroup>
            <FilterLabel>Kategori</FilterLabel>
            <FilterInput
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Kategori"
            />
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel>Min Fiyat</FilterLabel>
            <FilterInput
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min TL"
            />
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel>Max Fiyat</FilterLabel>
            <FilterInput
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max TL"
            />
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel>Marka</FilterLabel>
            <FilterInput
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Marka"
            />
          </FilterGroup>
        </FiltersContainer>
      </SearchSection>

      <SuggestionsContainer>
        <SuggestionsTitle>Hızlı Öneriler</SuggestionsTitle>
        <SuggestionsGrid>
          {suggestions.map((suggestion, index) => (
            <SuggestionCard key={index} onClick={() => handleSuggestionClick(suggestion.text)}>
              <SuggestionText>{suggestion.text}</SuggestionText>
              <SuggestionType>{suggestion.type}</SuggestionType>
            </SuggestionCard>
          ))}
        </SuggestionsGrid>
      </SuggestionsContainer>

      <TrendingSection>
        <TrendingTitle>
          <TrendingUp size={20} />
          Trend Ürünler
        </TrendingTitle>
        <TrendingGrid>
          {trendingProducts.map((product, index) => (
            <TrendingCard key={index}>
              <TrendingProduct>{product.name}</TrendingProduct>
              <TrendingPrice>{product.price}</TrendingPrice>
              <TrendingScore>Trend Skoru: {product.score}</TrendingScore>
            </TrendingCard>
          ))}
        </TrendingGrid>
      </TrendingSection>

      {searchResults && (
        <ResultsContainer>
          <ResultsHeader>
            <ResultsTitle>Arama Sonuçları</ResultsTitle>
            <ResultsCount>{searchResults.total_results} ürün bulundu</ResultsCount>
          </ResultsHeader>

          {searchResults.search_params && (
            <SearchParams>
              <ParamsTitle>Analiz Edilen Parametreler</ParamsTitle>
              <ParamsList>
                {Object.entries(searchResults.search_params).map(([key, value]) => {
                  if (value && value !== '' && value !== 0) {
                    return (
                      <ParamTag key={key}>
                        {key}: {typeof value === 'object' ? JSON.stringify(value) : value}
                      </ParamTag>
                    );
                  }
                  return null;
                })}
              </ParamsList>
            </SearchParams>
          )}

          <ProductsGrid>
            {searchResults.products.map((product) => (
              <ProductCard key={product.id}>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>{product.price} TL</ProductPrice>
                <ProductCategory>{product.category}</ProductCategory>
                <ProductBrand>{product.brand}</ProductBrand>
              </ProductCard>
            ))}
          </ProductsGrid>
        </ResultsContainer>
      )}
    </SearchContainer>
  );
}

export default Search; 