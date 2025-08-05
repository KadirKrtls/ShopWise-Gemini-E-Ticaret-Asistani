import React, { useState } from 'react';
import styled from 'styled-components';
import { Bell, TrendingUp, TrendingDown, DollarSign, Package, AlertTriangle, Plus } from 'lucide-react';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const TrackingContainer = styled.div`
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

const TrackingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const TrackingCard = styled.div`
  background: white;
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-left: 6px solid ${props => {
    if (props.priceChange > 0) return '#ef4444';
    if (props.priceChange < 0) return '#10b981';
    return '#6b7280';
  }};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
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
    background: ${props => {
      if (props.priceChange > 0) return 'linear-gradient(90deg, #ef4444, #dc2626)';
      if (props.priceChange < 0) return 'linear-gradient(90deg, #10b981, #059669)';
      return 'linear-gradient(90deg, #6b7280, #4b5563)';
    }};
  }
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ProductImage = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
`;

const ProductDetails = styled.div`
  flex: 1;
`;

const ProductName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
`;

const ProductCategory = styled.p`
  color: #64748b;
  font-size: 0.875rem;
`;

const PriceInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CurrentPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
`;

const PriceChange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: ${props => {
    if (props.change > 0) return '#ef4444';
    if (props.change < 0) return '#10b981';
    return '#6b7280';
  }};
`;

const PriceHistory = styled.div`
  margin-bottom: 1.5rem;
`;

const HistoryTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 0.5rem;
`;

const HistoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.875rem;

  &:last-child {
    border-bottom: none;
  }
`;

const AlertSettings = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const AlertToggle = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: #374151;
`;

const Toggle = styled.input`
  width: 1rem;
  height: 1rem;
`;

const AlertThreshold = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ThresholdInput = styled.input`
  width: 80px;
  padding: 0.25rem 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-size: 0.875rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &.primary {
    background: #3b82f6;
    color: white;
    
    &:hover {
      background: #2563eb;
    }
  }

  &.danger {
    background: #ef4444;
    color: white;
    
    &:hover {
      background: #dc2626;
    }
  }

  &.success {
    background: #10b981;
    color: white;
    
    &:hover {
      background: #059669;
    }
  }
`;

const AddTrackingButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 auto;

  &:hover {
    background: #059669;
    transform: translateY(-1px);
  }
`;

const mockTrackedProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    category: "Telefon",
    currentPrice: 45999,
    previousPrice: 47999,
    priceChange: -2000,
    priceHistory: [
      { date: "2024-01-15", price: 47999 },
      { date: "2024-01-10", price: 48999 },
      { date: "2024-01-05", price: 49999 }
    ],
    alertEnabled: true,
    alertThreshold: 45000,
    image: "📱"
  },
  {
    id: 2,
    name: "MacBook Air M2",
    category: "Bilgisayar",
    currentPrice: 35999,
    previousPrice: 34999,
    priceChange: 1000,
    priceHistory: [
      { date: "2024-01-15", price: 34999 },
      { date: "2024-01-10", price: 35999 },
      { date: "2024-01-05", price: 36999 }
    ],
    alertEnabled: true,
    alertThreshold: 34000,
    image: "💻"
  },
  {
    id: 3,
    name: "AirPods Pro",
    category: "Aksesuar",
    currentPrice: 5999,
    previousPrice: 5999,
    priceChange: 0,
    priceHistory: [
      { date: "2024-01-15", price: 5999 },
      { date: "2024-01-10", price: 6499 },
      { date: "2024-01-05", price: 6999 }
    ],
    alertEnabled: false,
    alertThreshold: 5500,
    image: "🎧"
  }
];

function PriceTracking() {
  const [trackedProducts, setTrackedProducts] = useState(mockTrackedProducts);

  const toggleAlertMutation = useMutation(
    async ({ productId, enabled }) => {
      // API call would go here
      return { success: true };
    },
    {
      onSuccess: (data, variables) => {
        setTrackedProducts(prev => 
          prev.map(product => 
            product.id === variables.productId 
              ? { ...product, alertEnabled: variables.enabled }
              : product
          )
        );
        toast.success(`Fiyat alarmı ${variables.enabled ? 'aktif' : 'devre dışı'}`);
      },
      onError: (error) => {
        toast.error('Alarm ayarı değiştirilemedi');
      }
    }
  );

  const updateThresholdMutation = useMutation(
    async ({ productId, threshold }) => {
      // API call would go here
      return { success: true };
    },
    {
      onSuccess: (data, variables) => {
        setTrackedProducts(prev => 
          prev.map(product => 
            product.id === variables.productId 
              ? { ...product, alertThreshold: variables.threshold }
              : product
          )
        );
        toast.success('Alarm eşiği güncellendi');
      },
      onError: (error) => {
        toast.error('Alarm eşiği güncellenemedi');
      }
    }
  );

  const removeTrackingMutation = useMutation(
    async (productId) => {
      // API call would go here
      return { success: true };
    },
    {
      onSuccess: (data, productId) => {
        setTrackedProducts(prev => prev.filter(product => product.id !== productId));
        toast.success('Ürün takipten çıkarıldı');
      },
      onError: (error) => {
        toast.error('Ürün takipten çıkarılamadı');
      }
    }
  );

  const handleToggleAlert = (productId, enabled) => {
    toggleAlertMutation.mutate({ productId, enabled });
  };

  const handleUpdateThreshold = (productId, threshold) => {
    updateThresholdMutation.mutate({ productId, threshold: parseInt(threshold) });
  };

  const handleRemoveTracking = (productId) => {
    removeTrackingMutation.mutate(productId);
  };

  return (
    <TrackingContainer>
      <Header>
        <Title>
          <Bell size={32} />
          Fiyat Takibi
        </Title>
        <Subtitle>Takip ettiğiniz ürünlerin fiyat değişimlerini izleyin</Subtitle>
      </Header>

      <TrackingGrid>
        {trackedProducts.map((product) => (
          <TrackingCard key={product.id} priceChange={product.priceChange}>
            <ProductInfo>
              <ProductImage>{product.image}</ProductImage>
              <ProductDetails>
                <ProductName>{product.name}</ProductName>
                <ProductCategory>{product.category}</ProductCategory>
              </ProductDetails>
            </ProductInfo>

            <PriceInfo>
              <CurrentPrice>{product.currentPrice.toLocaleString()} TL</CurrentPrice>
              <PriceChange change={product.priceChange}>
                {product.priceChange > 0 ? (
                  <TrendingUp size={16} />
                ) : product.priceChange < 0 ? (
                  <TrendingDown size={16} />
                ) : (
                  <DollarSign size={16} />
                )}
                {product.priceChange > 0 ? '+' : ''}{product.priceChange.toLocaleString()} TL
              </PriceChange>
            </PriceInfo>

            <PriceHistory>
              <HistoryTitle>Fiyat Geçmişi</HistoryTitle>
              {product.priceHistory.slice(0, 3).map((history, index) => (
                <HistoryItem key={index}>
                  <span>{history.date}</span>
                  <span>{history.price.toLocaleString()} TL</span>
                </HistoryItem>
              ))}
            </PriceHistory>

            <AlertSettings>
              <AlertToggle>
                <Toggle
                  type="checkbox"
                  checked={product.alertEnabled}
                  onChange={(e) => handleToggleAlert(product.id, e.target.checked)}
                />
                Fiyat Alarmı
              </AlertToggle>
              {product.alertEnabled && (
                <AlertThreshold>
                  <span>Eşik:</span>
                  <ThresholdInput
                    type="number"
                    value={product.alertThreshold}
                    onChange={(e) => handleUpdateThreshold(product.id, e.target.value)}
                  />
                  <span>TL</span>
                </AlertThreshold>
              )}
            </AlertSettings>

            <ActionButtons>
              <Button 
                className="danger"
                onClick={() => handleRemoveTracking(product.id)}
                disabled={removeTrackingMutation.isLoading}
              >
                Takibi Durdur
              </Button>
            </ActionButtons>
          </TrackingCard>
        ))}
      </TrackingGrid>

      <div style={{ textAlign: 'center' }}>
        <AddTrackingButton>
          <Plus size={20} />
          Yeni Ürün Takip Et
        </AddTrackingButton>
      </div>
    </TrackingContainer>
  );
}

export default PriceTracking; 