import React, { useState } from 'react';
import styled from 'styled-components';
import { Scale, TrendingUp, Star, DollarSign, Package, AlertTriangle } from 'lucide-react';
import { useMutation } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const ComparisonContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 1.125rem;
`;

const ProductSelector = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 3px solid ${props => props.selected ? '#10b981' : '#e2e8f0'};
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #10b981;
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.selected ? 'linear-gradient(90deg, #10b981, #059669)' : 'transparent'};
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  margin-bottom: 1rem;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
  }
`;

const ProductName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const ProductPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #10b981;
  margin-bottom: 1rem;
`;

const ProductStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
`;

const ComparisonTable = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TableHeader = styled.div`
  background: #f8fafc;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
`;

const TableTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const TableContent = styled.div`
  padding: 2rem;
`;

const ComparisonRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  padding: 1rem 0;
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
  }
`;

const ComparisonLabel = styled.div`
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ComparisonValue = styled.div`
  font-size: 1.125rem;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ComparisonValue2 = styled.div`
  font-size: 1.125rem;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const GeminiRecommendation = styled.div`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 2rem;
  border-radius: 1rem;
  margin-top: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const RecommendationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const RecommendationTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
`;

const RecommendationText = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  opacity: 0.95;
`;

const Button = styled.button`
  background: #10b981;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #059669;
    transform: translateY(-1px);
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
  }
`;

const mockProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: "45.999 TL",
    rating: 4.8,
    reviews: 1247,
    trendScore: 92,
    trustScore: 95,
    returnRate: 8,
    deliveryTime: "1-2 gün",
    warranty: "2 yıl",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop&crop=center"
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    price: "39.999 TL",
    rating: 4.6,
    reviews: 892,
    trendScore: 88,
    trustScore: 92,
    returnRate: 12,
    deliveryTime: "2-3 gün",
    warranty: "2 yıl",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop&crop=center"
  },
  {
    id: 3,
    name: "MacBook Air M2",
    price: "35.999 TL",
    rating: 4.7,
    reviews: 654,
    trendScore: 85,
    trustScore: 96,
    returnRate: 5,
    deliveryTime: "2-4 gün",
    warranty: "1 yıl",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop&crop=center"
  },
  {
    id: 4,
    name: "AirPods Pro",
    price: "5.999 TL",
    rating: 4.5,
    reviews: 1823,
    trendScore: 78,
    trustScore: 89,
    returnRate: 15,
    deliveryTime: "1 gün",
    warranty: "1 yıl",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&crop=center"
  }
];

function ProductComparison() {
  const [selectedProducts, setSelectedProducts] = useState([null, null]);
  const [comparisonData, setComparisonData] = useState(null);

  const compareProductsMutation = useMutation(
    async (productIds) => {
      const response = await axios.post('http://localhost:8000/api/v1/products/compare', {
        product_ids: productIds
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        setComparisonData(data);
        toast.success('Ürün karşılaştırması tamamlandı!');
      },
      onError: (error) => {
        toast.error('Karşılaştırma yapılamadı. Lütfen tekrar deneyin.');
        console.error('Comparison error:', error);
      }
    }
  );

  const handleProductSelect = (product, index) => {
    const newSelected = [...selectedProducts];
    newSelected[index] = product;
    setSelectedProducts(newSelected);
    toast.success(`${product.name} seçildi!`);
  };

  const handleCompare = () => {
    if (selectedProducts[0] && selectedProducts[1]) {
      compareProductsMutation.mutate([
        selectedProducts[0].id,
        selectedProducts[1].id
      ]);
    }
  };

  const canCompare = selectedProducts[0] && selectedProducts[1];

  return (
    <ComparisonContainer>
      <Header>
        <Title>
          <Scale size={32} />
          Ürün Karşılaştırma
        </Title>
        <Subtitle>Gemini AI destekli akıllı ürün karşılaştırması</Subtitle>
      </Header>

      <ProductSelector>
        {[0, 1].map((index) => (
          <div key={index}>
            <h3 style={{ marginBottom: '1rem', color: '#374151' }}>Ürün {index + 1}</h3>
            <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem' }}>
              {mockProducts.slice(index * 2, index * 2 + 2).map((product) => (
                <ProductCard
                  key={product.id}
                  selected={selectedProducts[index]?.id === product.id}
                  onClick={() => handleProductSelect(product, index)}
                >
                  <ProductImage>
                    <img src={product.image} alt={product.name} />
                  </ProductImage>
                  <ProductName>{product.name}</ProductName>
                  <ProductPrice>{product.price}</ProductPrice>
                  <ProductStats>
                    <Stat>
                      <Star size={16} />
                      {product.rating}
                    </Stat>
                    <Stat>
                      <TrendingUp size={16} />
                      {product.trendScore}
                    </Stat>
                  </ProductStats>
                </ProductCard>
              ))}
            </div>
          </div>
        ))}
      </ProductSelector>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Button
          onClick={handleCompare}
          disabled={!canCompare || compareProductsMutation.isLoading}
        >
          {compareProductsMutation.isLoading ? 'Karşılaştırılıyor...' : 'Karşılaştır'}
        </Button>
      </div>

      {comparisonData && (
        <>
          <ComparisonTable>
            <TableHeader>
              <TableTitle>Detaylı Karşılaştırma</TableTitle>
            </TableHeader>
            <TableContent>
              <ComparisonRow>
                <ComparisonLabel>
                  <DollarSign size={20} />
                  Fiyat
                </ComparisonLabel>
                <ComparisonValue>{selectedProducts[0].price}</ComparisonValue>
                <ComparisonValue2>{selectedProducts[1].price}</ComparisonValue2>
              </ComparisonRow>
              
              <ComparisonRow>
                <ComparisonLabel>
                  <Star size={20} />
                  Değerlendirme
                </ComparisonLabel>
                <ComparisonValue>
                  <Star size={16} />
                  {selectedProducts[0].rating} ({selectedProducts[0].reviews} yorum)
                </ComparisonValue>
                <ComparisonValue2>
                  <Star size={16} />
                  {selectedProducts[1].rating} ({selectedProducts[1].reviews} yorum)
                </ComparisonValue2>
              </ComparisonRow>
              
              <ComparisonRow>
                <ComparisonLabel>
                  <TrendingUp size={20} />
                  Trend Skoru
                </ComparisonLabel>
                <ComparisonValue>{selectedProducts[0].trendScore}/100</ComparisonValue>
                <ComparisonValue2>{selectedProducts[1].trendScore}/100</ComparisonValue2>
              </ComparisonRow>
              
              <ComparisonRow>
                <ComparisonLabel>
                  <Package size={20} />
                  Güven Skoru
                </ComparisonLabel>
                <ComparisonValue>%{selectedProducts[0].trustScore}</ComparisonValue>
                <ComparisonValue2>%{selectedProducts[1].trustScore}</ComparisonValue2>
              </ComparisonRow>
              
              <ComparisonRow>
                <ComparisonLabel>
                  <AlertTriangle size={20} />
                  İade Oranı
                </ComparisonLabel>
                <ComparisonValue>%{selectedProducts[0].returnRate}</ComparisonValue>
                <ComparisonValue2>%{selectedProducts[1].returnRate}</ComparisonValue2>
              </ComparisonRow>
              
              <ComparisonRow>
                <ComparisonLabel>
                  <Package size={20} />
                  Teslimat Süresi
                </ComparisonLabel>
                <ComparisonValue>{selectedProducts[0].deliveryTime}</ComparisonValue>
                <ComparisonValue2>{selectedProducts[1].deliveryTime}</ComparisonValue2>
              </ComparisonRow>
              
              <ComparisonRow>
                <ComparisonLabel>
                  <Package size={20} />
                  Garanti
                </ComparisonLabel>
                <ComparisonValue>{selectedProducts[0].warranty}</ComparisonValue>
                <ComparisonValue2>{selectedProducts[1].warranty}</ComparisonValue2>
              </ComparisonRow>
            </TableContent>
          </ComparisonTable>

          <GeminiRecommendation>
            <RecommendationHeader>
              <Star size={24} />
              <RecommendationTitle>Gemini AI Önerisi</RecommendationTitle>
            </RecommendationHeader>
            <RecommendationText>
              {selectedProducts[0].price < selectedProducts[1].price 
                ? `${selectedProducts[0].name} sizin için daha uygun olabilir çünkü daha uygun fiyatlı ve daha yüksek güven skoruna sahip. Ayrıca daha az iade oranı ile daha güvenilir bir seçim sunuyor.`
                : `${selectedProducts[1].name} daha iyi bir seçenek olabilir çünkü daha yüksek trend skoruna ve daha fazla kullanıcı değerlendirmesine sahip. Bu da ürünün popülerliğini ve güvenilirliğini gösteriyor.`
              }
            </RecommendationText>
          </GeminiRecommendation>
        </>
      )}
    </ComparisonContainer>
  );
}

export default ProductComparison; 