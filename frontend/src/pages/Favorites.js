import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Heart, Star, ShoppingCart, X, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const FavoritesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-lg);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-xl);
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: var(--text-secondary);
  font-weight: 500;
`;

const FavoritesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
`;

const FavoriteCard = styled.div`
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  border: 2px solid var(--light-gray);
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-blue);
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  background: var(--danger);
  color: var(--white);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--danger-dark);
    transform: scale(1.1);
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--radius-md);
  }
`;

const ProductInfo = styled.div`
  text-align: center;
`;

const ProductName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
`;

const ProductPrice = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: var(--spacing-md);
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
  color: var(--text-secondary);
  font-size: 14px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: var(--spacing-sm);
`;

const Button = styled.button`
  flex: 1;
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: var(--radius-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  
  &.primary {
    background: var(--primary-blue);
    color: var(--white);
    
    &:hover {
      background: var(--secondary-blue);
      transform: translateY(-1px);
    }
  }
  
  &.secondary {
    background: var(--light-gray);
    color: var(--text-primary);
    border: 1px solid var(--medium-gray);
    
    &:hover {
      background: var(--medium-gray);
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: var(--spacing-xl) 0;
  color: var(--text-secondary);
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: var(--spacing-lg);
  color: var(--medium-gray);
`;

const EmptyTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
`;

const EmptyText = styled.p`
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-lg);
`;

const mockFavorites = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: "45.999 TL",
    rating: 4.8,
    reviews: 1247,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop&crop=center",
    addedDate: "2024-01-15"
  },
  {
    id: 2,
    name: "MacBook Air M2",
    price: "35.999 TL",
    rating: 4.7,
    reviews: 654,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop&crop=center",
    addedDate: "2024-01-12"
  },
  {
    id: 3,
    name: "AirPods Pro",
    price: "5.999 TL",
    rating: 4.5,
    reviews: 1823,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&crop=center",
    addedDate: "2024-01-10"
  }
];

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage'dan favori ürünleri oku
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    } else {
      // İlk kullanımda mock data'yı kaydet
      setFavorites(mockFavorites);
      localStorage.setItem('favorites', JSON.stringify(mockFavorites));
    }
  }, []);

  const handleRemoveFavorite = (productId) => {
    const updatedFavorites = favorites.filter(item => item.id !== productId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    toast.success('Ürün favorilerden çıkarıldı!');
  };

  const handleAddToCart = (product) => {
    // Sepete ekleme işlemi
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success(`${product.name} sepete eklendi!`);
  };

  const handleProductClick = (product) => {
    toast.success(`${product.name} detayları açılıyor...`);
    navigate(`/products/${product.id}`);
  };

  const handleShopNow = () => {
    navigate('/search');
    toast.success('Alışverişe başlayın!');
  };

  if (favorites.length === 0) {
    return (
      <FavoritesContainer>
        <Header>
          <Title>
            <Heart size={28} />
            Favorilerim
          </Title>
          <Subtitle>Beğendiğiniz ürünler burada görünecek</Subtitle>
        </Header>
        
        <EmptyState>
          <EmptyIcon>💝</EmptyIcon>
          <EmptyTitle>Henüz favori ürününüz yok</EmptyTitle>
          <EmptyText>
            Beğendiğiniz ürünleri favorilere ekleyerek kolayca takip edebilirsiniz
          </EmptyText>
          <Button className="primary" onClick={handleShopNow}>
            <Package size={16} />
            Alışverişe Başla
          </Button>
        </EmptyState>
      </FavoritesContainer>
    );
  }

  return (
    <FavoritesContainer>
      <Header>
        <Title>
          <Heart size={28} />
          Favorilerim ({favorites.length})
        </Title>
        <Subtitle>Beğendiğiniz ürünlerinizi kolayca yönetin</Subtitle>
      </Header>

      <FavoritesGrid>
        {favorites.map((product) => (
          <FavoriteCard key={product.id}>
            <RemoveButton onClick={() => handleRemoveFavorite(product.id)}>
              <X size={16} />
            </RemoveButton>
            
            <ProductImage onClick={() => handleProductClick(product)}>
              <img src={product.image} alt={product.name} />
            </ProductImage>
            
            <ProductInfo>
              <ProductName>{product.name}</ProductName>
              <ProductPrice>
                {product.priceDisplay || (typeof product.price === 'number' ? `${product.price.toLocaleString()} TL` : product.price)}
              </ProductPrice>
              <ProductRating>
                <Star size={16} fill="#FBBF24" color="#FBBF24" />
                {product.rating} ({product.reviews} değerlendirme)
              </ProductRating>
              
              <ActionButtons>
                <Button 
                  className="primary" 
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart size={16} />
                  Sepete Ekle
                </Button>
                <Button 
                  className="secondary" 
                  onClick={() => handleProductClick(product)}
                >
                  Detaylar
                </Button>
              </ActionButtons>
            </ProductInfo>
          </FavoriteCard>
        ))}
      </FavoritesGrid>
    </FavoritesContainer>
  );
}

export default Favorites;