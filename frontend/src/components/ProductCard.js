import React from 'react';
import styled from 'styled-components';
import { Star, Heart, ShoppingCart, Scale, TrendingUp, AlertTriangle, Eye } from 'lucide-react';

const Card = styled.div`
  background: white;
  border-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow: 0 4px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  height: 550px;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 25px 25px -5px rgba(0, 0, 0, 0.1);
    border-color: #3b82f6;
    
    .action-buttons {
      opacity: 1;
      transform: translateY(0);
    }
    
    .product-image {
      transform: scale(1.05);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => {
      if (props.discount > 20) return 'linear-gradient(90deg, #ef4444, #dc2626)';
      if (props.discount > 10) return 'linear-gradient(90deg, #f59e0b, #d97706)';
      if (props.discount > 0) return 'linear-gradient(90deg, #10b981, #059669)';
      return 'linear-gradient(90deg, #3b82f6, #2563eb)';
    }};
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  background: #f8fafc;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1rem;
    transition: transform 0.4s ease;
  }
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
  transform: rotate(-5deg);
  z-index: 10;
  
  &::before {
    content: '🔥';
    margin-right: 0.25rem;
  }
  
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% { transform: rotate(-5deg) scale(1); }
    50% { transform: rotate(-5deg) scale(1.05); }
  }
`;

const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const ProductName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
  line-height: 1.4;
`;

const ProductBrand = styled.p`
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const ProductDescription = styled.p`
  color: #6b7280;
  font-size: 0.8rem;
  line-height: 1.4;
  margin: 0.5rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const CurrentPrice = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
`;

const OriginalPrice = styled.span`
  font-size: 1rem;
  color: #94a3b8;
  text-decoration: line-through;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const RatingText = styled.span`
  font-size: 0.875rem;
  color: #64748b;
`;

const StockInfo = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.inStock ? '#10b981' : '#ef4444'};
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 0.5rem;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: #64748b;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  opacity: 0.7;
  transform: translateY(10px);
  transition: all 0.3s ease;
`;

const MainActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SecondaryActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.75rem 0.5rem;
  border: none;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  &.primary {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
    
    &:hover {
      background: linear-gradient(135deg, #1d4ed8, #1e3a8a);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
    }
  }

  &.secondary {
    background: #f8fafc;
    color: #475569;
    border: 1px solid #e2e8f0;
    
    &:hover {
      background: #f1f5f9;
      border-color: #cbd5e1;
    }
  }

  &.danger {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: white;
    
    &:hover {
      background: linear-gradient(135deg, #dc2626, #b91c1c);
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
    }
  }

  &.success {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    
    &:hover {
      background: linear-gradient(135deg, #059669, #047857);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
    }
  }

  &.warning {
    background: linear-gradient(135deg, #f59e0b, #d97706);
    color: white;
    
    &:hover {
      background: linear-gradient(135deg, #d97706, #b45309);
      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    
    &:hover {
      transform: none;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }
`;

const TrustScore = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(16, 185, 129, 0.9);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

function ProductCard({ product, onAddToCart, onAddToFavorites, onCompare, onTrackPrice, onQuickView, isInCart, isInFavorites, isInCompare }) {
  const {
    name,
    brand,
    price,
    originalPrice,
    rating,
    reviews,
    image,
    description,
    discount,
    trendScore,
    trustScore,
    returnRate,
    inStock,
    stockCount
  } = product;

  return (
    <Card discount={discount}>
      <TrustScore>
        <TrendingUp size={12} />
        %{trustScore}
      </TrustScore>
      
      <ImageContainer>
        <img src={image} alt={name} className="product-image" />
        {discount > 0 && (
          <DiscountBadge>
            %{discount} İndirim
          </DiscountBadge>
        )}
      </ImageContainer>

      <ProductInfo>
        <ProductName>{name}</ProductName>
        <ProductBrand>{brand}</ProductBrand>
        
        {description && (
          <ProductDescription>{description}</ProductDescription>
        )}
        
        <PriceContainer>
          <CurrentPrice>{price.toLocaleString()} TL</CurrentPrice>
          {originalPrice > price && (
            <OriginalPrice>{originalPrice.toLocaleString()} TL</OriginalPrice>
          )}
        </PriceContainer>

        <RatingContainer>
          <Rating>
            <Star size={16} fill="#fbbf24" color="#fbbf24" />
            <span>{rating}</span>
          </Rating>
          <RatingText>({reviews} yorum)</RatingText>
        </RatingContainer>

        <StockInfo inStock={inStock}>
          {inStock ? (
            stockCount <= 10 ? (
              <span style={{color: '#f59e0b'}}>⚠️ Az stok: {stockCount} adet</span>
            ) : stockCount <= 5 ? (
              <span style={{color: '#ef4444'}}>🔥 Son {stockCount} adet!</span>
            ) : (
              <span>✅ Stokta: {stockCount} adet</span>
            )
          ) : (
            <span>❌ Stokta yok</span>
          )}
        </StockInfo>

        <StatsContainer>
          <Stat>
            <TrendingUp size={12} />
            {trendScore?.toFixed(1)}
          </Stat>
          <Stat>
            <AlertTriangle size={12} />
            %{returnRate?.toFixed(1)}
          </Stat>
        </StatsContainer>
      </ProductInfo>

      <ActionButtons className="action-buttons">
        <MainActions>
          <Button 
            className="primary"
            onClick={() => onAddToCart && onAddToCart(product)}
            disabled={!inStock}
          >
            <ShoppingCart size={16} />
            {isInCart ? 'Sepette' : 'Sepete Ekle'}
          </Button>
          
          <Button 
            className="secondary"
            onClick={() => onQuickView && onQuickView()}
          >
            <Eye size={16} />
            Hızlı İncele
          </Button>
        </MainActions>
        
        <SecondaryActions>
          <Button 
            className={isInFavorites ? "danger" : "secondary"}
            onClick={() => onAddToFavorites && onAddToFavorites(product)}
            title="Favorilere Ekle"
          >
            <Heart size={14} fill={isInFavorites ? "currentColor" : "none"} />
          </Button>
          
          <Button 
            className={isInCompare ? "warning" : "secondary"}
            onClick={() => onCompare && onCompare(product)}
            title="Karşılaştır"
          >
            <Scale size={14} />
          </Button>
          
          <Button 
            className="secondary"
            onClick={() => onTrackPrice && onTrackPrice(product)}
            title="Fiyat Takibi"
          >
            <TrendingUp size={14} />
          </Button>
        </SecondaryActions>
      </ActionButtons>
    </Card>
  );
}

export default ProductCard; 