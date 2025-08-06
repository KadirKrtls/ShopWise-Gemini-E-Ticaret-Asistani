import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Shield, 
  Truck, 
  RotateCcw,
  Share2,
  ChevronLeft,
  Plus,
  Minus
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProductDetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-lg);
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: transparent;
  border: 1px solid var(--medium-gray);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  cursor: pointer;
  margin-bottom: var(--spacing-lg);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--primary-blue);
    color: var(--primary-blue);
  }
`;

const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageSection = styled.div`
  position: sticky;
  top: var(--spacing-lg);
  height: fit-content;
`;

const MainImage = styled.div`
  width: 100%;
  height: 500px;
  background: var(--light-gray);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-md);
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageThumbnails = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  overflow-x: auto;
`;

const Thumbnail = styled.div`
  width: 80px;
  height: 80px;
  background: var(--light-gray);
  border-radius: var(--radius-md);
  border: 2px solid ${props => props.active ? 'var(--primary-blue)' : 'transparent'};
  cursor: pointer;
  overflow: hidden;
  flex-shrink: 0;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--primary-blue);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductInfo = styled.div``;

const ProductHeader = styled.div`
  margin-bottom: var(--spacing-lg);
`;

const ProductTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  line-height: 1.2;
`;

const ProductBrand = styled.div`
  color: var(--primary-blue);
  font-weight: 600;
  font-size: 18px;
  margin-bottom: var(--spacing-md);
`;

const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
`;

const Stars = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
`;

const RatingText = styled.span`
  color: var(--text-secondary);
  font-size: 14px;
`;

const PriceSection = styled.div`
  margin-bottom: var(--spacing-xl);
`;

const CurrentPrice = styled.div`
  font-size: 36px;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
`;

const OriginalPrice = styled.div`
  font-size: 20px;
  color: var(--text-muted);
  text-decoration: line-through;
  margin-right: var(--spacing-sm);
`;

const DiscountBadge = styled.span`
  background: var(--danger);
  color: var(--white);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 600;
`;

const ActionsSection = styled.div`
  margin-bottom: var(--spacing-xl);
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
`;

const QuantityLabel = styled.span`
  font-weight: 600;
  color: var(--text-primary);
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid var(--medium-gray);
  border-radius: var(--radius-sm);
`;

const QuantityButton = styled.button`
  background: var(--white);
  border: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--light-gray);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.div`
  min-width: 60px;
  text-align: center;
  font-weight: 600;
  border-left: 1px solid var(--medium-gray);
  border-right: 1px solid var(--medium-gray);
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
`;

const PrimaryButton = styled.button`
  flex: 2;
  background: var(--primary-blue);
  color: var(--white);
  border: none;
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  
  &:hover {
    background: var(--secondary-blue);
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled.button`
  flex: 1;
  background: var(--white);
  color: var(--text-primary);
  border: 2px solid var(--medium-gray);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  
  &:hover {
    border-color: var(--primary-blue);
    color: var(--primary-blue);
  }
  
  &.favorite {
    color: var(--danger);
    border-color: var(--danger);
    
    &:hover {
      background: var(--danger);
      color: var(--white);
    }
  }
`;

const Features = styled.div`
  margin-bottom: var(--spacing-xl);
`;

const FeaturesTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--light-gray);
  display: flex;
  justify-content: space-between;
  
  &:last-child {
    border-bottom: none;
  }
`;

const FeatureLabel = styled.span`
  color: var(--text-secondary);
`;

const FeatureValue = styled.span`
  color: var(--text-primary);
  font-weight: 500;
`;

const GuaranteeSection = styled.div`
  background: var(--light-gray);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
`;

const GuaranteeTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
`;

const GuaranteeItems = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
`;

const GuaranteeItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--text-secondary);
`;

// Mock product data
const mockProduct = {
  id: 1,
  name: "iPhone 15 Pro Max 256GB",
  brand: "Apple",
  price: 65999,
  originalPrice: 69999,
  discount: 6,
  rating: 4.8,
  reviewCount: 1247,
  images: [
    "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=600&h=600&fit=crop"
  ],
  features: {
    "Ekran Boyutu": "6.7 inç",
    "İşlemci": "A17 Pro",
    "Depolama": "256 GB",
    "Kamera": "48 MP Ana + 12 MP Ultra Wide",
    "Batarya": "4422 mAh",
    "İşletim Sistemi": "iOS 17",
    "Renk": "Doğal Titanyum",
    "Garanti": "2 Yıl Apple Türkiye Garantisi"
  },
  inStock: true,
  stockCount: 12
};

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product] = useState(mockProduct); // Gerçek uygulamada API'den çekilir
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Gerçek uygulamada product ID ile API çağrısı yapılır
    console.log('Product ID:', id);
  }, [id]);

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stockCount) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ 
        ...product, 
        quantity,
        price: product.price, // Number olarak sakla
        priceDisplay: `${product.price.toLocaleString()} TL`, // Display için
        image: product.images[0]
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success(`${quantity} adet ${product.name} sepete eklendi!`);
  };

  const handleToggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      const updatedFavorites = favorites.filter(item => item.id !== product.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
      toast.success('Favorilerden çıkarıldı');
    } else {
      favorites.push({
        ...product,
        price: product.price, // Number olarak sakla
        priceDisplay: `${product.price.toLocaleString()} TL`, // Display için
        image: product.images[0]
      });
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
      toast.success('Favorilere eklendi');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `${product.name} - ${product.price.toLocaleString()} TL`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link kopyalandı!');
    }
  };

  return (
    <ProductDetailContainer>
      <BackButton onClick={() => navigate(-1)}>
        <ChevronLeft size={20} />
        Geri Dön
      </BackButton>

      <ProductLayout>
        <ImageSection>
          <MainImage>
            <img src={product.images[selectedImageIndex]} alt={product.name} />
          </MainImage>
          <ImageThumbnails>
            {product.images.map((image, index) => (
              <Thumbnail
                key={index}
                active={selectedImageIndex === index}
                onClick={() => setSelectedImageIndex(index)}
              >
                <img src={image} alt={`${product.name} ${index + 1}`} />
              </Thumbnail>
            ))}
          </ImageThumbnails>
        </ImageSection>

        <ProductInfo>
          <ProductHeader>
            <ProductBrand>{product.brand}</ProductBrand>
            <ProductTitle>{product.name}</ProductTitle>
            
            <RatingSection>
              <Stars>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill={i < Math.floor(product.rating) ? "#FBBF24" : "none"}
                    color="#FBBF24"
                  />
                ))}
                <span style={{ marginLeft: '8px', fontWeight: '600' }}>
                  {product.rating}
                </span>
              </Stars>
              <RatingText>({product.reviewCount} değerlendirme)</RatingText>
            </RatingSection>
          </ProductHeader>

          <PriceSection>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <CurrentPrice>{product.price.toLocaleString()} TL</CurrentPrice>
              {product.originalPrice && (
                <>
                  <OriginalPrice>{product.originalPrice.toLocaleString()} TL</OriginalPrice>
                  <DiscountBadge>%{product.discount} İndirim</DiscountBadge>
                </>
              )}
            </div>
          </PriceSection>

          <ActionsSection>
            <QuantitySelector>
              <QuantityLabel>Adet:</QuantityLabel>
              <QuantityControls>
                <QuantityButton 
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </QuantityButton>
                <QuantityDisplay>{quantity}</QuantityDisplay>
                <QuantityButton 
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stockCount}
                >
                  <Plus size={16} />
                </QuantityButton>
              </QuantityControls>
              <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                (Stokta {product.stockCount} adet)
              </span>
            </QuantitySelector>

            <ActionButtons>
              <PrimaryButton onClick={handleAddToCart}>
                <ShoppingCart size={20} />
                Sepete Ekle
              </PrimaryButton>
              <SecondaryButton 
                className={isFavorite ? 'favorite' : ''}
                onClick={handleToggleFavorite}
              >
                <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
              </SecondaryButton>
              <SecondaryButton onClick={handleShare}>
                <Share2 size={20} />
              </SecondaryButton>
            </ActionButtons>
          </ActionsSection>

          <Features>
            <FeaturesTitle>Ürün Özellikleri</FeaturesTitle>
            <FeaturesList>
              {Object.entries(product.features).map(([key, value]) => (
                <FeatureItem key={key}>
                  <FeatureLabel>{key}:</FeatureLabel>
                  <FeatureValue>{value}</FeatureValue>
                </FeatureItem>
              ))}
            </FeaturesList>
          </Features>

          <GuaranteeSection>
            <GuaranteeTitle>Güvenceler</GuaranteeTitle>
            <GuaranteeItems>
              <GuaranteeItem>
                <Shield size={20} color="var(--success)" />
                <span>2 Yıl Garanti</span>
              </GuaranteeItem>
              <GuaranteeItem>
                <Truck size={20} color="var(--primary-blue)" />
                <span>Ücretsiz Kargo</span>
              </GuaranteeItem>
              <GuaranteeItem>
                <RotateCcw size={20} color="var(--warning)" />
                <span>14 Gün İade</span>
              </GuaranteeItem>
            </GuaranteeItems>
          </GuaranteeSection>
        </ProductInfo>
      </ProductLayout>
    </ProductDetailContainer>
  );
}

export default ProductDetail;