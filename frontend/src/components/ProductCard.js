import React from 'react';
import styled from 'styled-components';
import { Star, Heart, ShoppingCart, Scale, TrendingUp, AlertTriangle } from 'lucide-react';

const Card = styled.div`
  background: white;
  border-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;

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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 4rem;
  margin-bottom: 1rem;
  position: relative;
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: #ef4444;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
`;

const ProductInfo = styled.div`
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
  gap: 0.5rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;

  &.primary {
    background: #3b82f6;
    color: white;
    
    &:hover {
      background: #2563eb;
    }
  }

  &.secondary {
    background: #f1f5f9;
    color: #64748b;
    
    &:hover {
      background: #e2e8f0;
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

function ProductCard({ product, onAddToCart, onAddToFavorites, onCompare, onTrackPrice }) {
  const {
    name,
    brand,
    price,
    originalPrice,
    rating,
    reviews,
    image,
    discount,
    trendScore,
    trustScore,
    returnRate,
    inStock
  } = product;

  return (
    <Card discount={discount}>
      <TrustScore>
        <TrendingUp size={12} />
        %{trustScore}
      </TrustScore>
      
      <ImageContainer>
        {image}
        {discount > 0 && (
          <DiscountBadge>
            %{discount} İndirim
          </DiscountBadge>
        )}
      </ImageContainer>

      <ProductInfo>
        <ProductName>{name}</ProductName>
        <ProductBrand>{brand}</ProductBrand>
        
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

        <StatsContainer>
          <Stat>
            <TrendingUp size={12} />
            {trendScore}
          </Stat>
          <Stat>
            <AlertTriangle size={12} />
            %{returnRate}
          </Stat>
        </StatsContainer>
      </ProductInfo>

      <ActionButtons>
        <Button 
          className="primary"
          onClick={() => onAddToCart && onAddToCart(product)}
          disabled={!inStock}
        >
          <ShoppingCart size={14} />
          Sepete Ekle
        </Button>
        
        <Button 
          className="secondary"
          onClick={() => onAddToFavorites && onAddToFavorites(product)}
        >
          <Heart size={14} />
        </Button>
        
        <Button 
          className="success"
          onClick={() => onCompare && onCompare(product)}
        >
          <Scale size={14} />
        </Button>
        
        <Button 
          className="danger"
          onClick={() => onTrackPrice && onTrackPrice(product)}
        >
          <TrendingUp size={14} />
        </Button>
      </ActionButtons>
    </Card>
  );
}

export default ProductCard; 