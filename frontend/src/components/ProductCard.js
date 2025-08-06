import React from 'react';
import styled from 'styled-components';
import { Star, Heart, ShoppingCart, Eye, TrendingUp } from 'lucide-react';

const Card = styled.div`
  background: var(--white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--medium-gray);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  height: 480px;
  display: grid;
  grid-template-rows: auto 1fr auto;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
    border-color: var(--primary-blue);
    
    .action-buttons {
      opacity: 1;
      transform: translateY(0);
    }
    
    .product-image {
      transform: scale(1.05);
    }
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  background: var(--light-gray);
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-left-radius: var(--radius-md);
    border-top-right-radius: var(--radius-md);
    transition: transform 0.3s ease;
  }
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  background: var(--error);
  color: var(--white);
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  z-index: 10;
  
  &::before {
    content: "🔥";
    margin-right: 4px;
  }
`;

const ProductInfo = styled.div`
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`;

const ProductName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: var(--spacing-sm) 0 4px;
  color: var(--text-primary);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductBrand = styled.p`
  color: var(--text-muted);
  font-size: 14px;
  margin-bottom: var(--spacing-sm);
`;

const ProductDescription = styled.p`
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.4;
  max-height: 2.8em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin: var(--spacing-sm) 0;
`;

const CurrentPrice = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
`;

const OriginalPrice = styled.span`
  font-size: 14px;
  color: var(--text-muted);
  text-decoration: line-through;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: var(--spacing-sm);
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const RatingText = styled.span`
  color: var(--text-secondary);
  font-size: 14px;
  margin-left: 4px;
`;

const StockInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: var(--spacing-sm);
  color: var(--success);
  font-weight: 500;
  font-size: 14px;
  
  &::before {
    content: "✔️";
    margin-right: 6px;
  }
`;

const ActionButtons = styled.div`
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  opacity: 0.9;
  transform: translateY(4px);
  transition: all 0.3s ease;
`;

const MainActions = styled.div`
  display: flex;
  gap: var(--spacing-sm);
`;

const SecondaryActions = styled.div`
  display: flex;
  gap: var(--spacing-sm);
`;

const Button = styled.button`
  flex: 1;
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
  }

  &:active {
    transform: translateY(0);
  }

  &.primary {
    background: var(--primary-blue);
    color: var(--white);
    
    &:hover {
      background: var(--secondary-blue);
    }
  }

  &.secondary {
    background: transparent;
    border: 1px solid var(--medium-gray);
    color: var(--text-primary);
    
    &:hover {
      border-color: var(--primary-blue);
      color: var(--primary-blue);
    }
  }

  &.danger {
    background: var(--error);
    color: var(--white);
    
    &:hover {
      background: #d32f2f;
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;

const TrustScore = styled.div`
  position: absolute;
  top: var(--spacing-sm);
  left: var(--spacing-sm);
  background: rgba(76, 175, 80, 0.9);
  color: var(--white);
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  z-index: 10;
`;

function ProductCard({ product, onAddToCart, onAddToFavorites, onQuickView, isInCart, isInFavorites }) {
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
    trustScore,
    inStock,
    stockCount
  } = product;

  return (
    <Card>
      {trustScore && (
        <TrustScore>
          <TrendingUp size={12} />
          %{trustScore}
        </TrustScore>
      )}
      
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

        <StockInfo>
          {inStock ? (
            stockCount <= 10 ? (
              <span style={{color: '#f57c00'}}>⚠️ Az stok: {stockCount} adet</span>
            ) : stockCount <= 5 ? (
              <span style={{color: '#ef4444'}}>🔥 Son {stockCount} adet!</span>
            ) : (
              <span>Stokta: {stockCount} adet</span>
            )
          ) : (
            <span style={{color: '#ef4444'}}>❌ Stokta yok</span>
          )}
        </StockInfo>
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
        </SecondaryActions>
      </ActionButtons>
    </Card>
  );
}

export default ProductCard; 