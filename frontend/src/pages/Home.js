import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { 
  Package, 
  TrendingUp,
  Users,
  Zap,
  Brain,
  Sparkles,
  ShoppingCart,
  MessageCircle,
  Search,
  ArrowRight,
  CheckCircle,
  Star,
  Shield,
  ExternalLink,
  Play,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

// Animasyonlar
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
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

// Ana Container
const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-lg);
  animation: ${css`${fadeIn} 0.8s ease-out`};
`;

// Hero Bölümü - Daha Kompakt
const Hero = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-xl) 0;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
`;

const LogoIcon = styled.div`
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: 28px;
  box-shadow: var(--shadow-md);
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 900;
  background: linear-gradient(135deg, var(--text-primary) 0%, var(--primary-blue) 50%, var(--primary-orange) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Subtitle = styled.p`
  font-size: 20px;
  color: var(--text-secondary);
  margin: var(--spacing-md) 0 var(--spacing-xl);
  font-weight: 500;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.4;
`;

// CTA - Sadece Ana Buton
const CTASection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-xl);
  animation: ${css`${slideIn} 0.6s ease-out 0.3s both`};
`;

const PrimaryCTA = styled.button`
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg) var(--spacing-xl);
  background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
  color: var(--white);
  border: none;
  border-radius: var(--radius-lg);
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-md);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    animation: ${css`${bounce} 1s`};
  }
  
  &:active {
    transform: translateY(-2px);
  }
`;

// Hızlı Aksiyonlar
const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-lg);
  margin: var(--spacing-xl) 0;
  animation: ${css`${slideIn} 0.6s ease-out 0.4s both`};
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }
`;

const QuickActionCard = styled.div`
  background: var(--white);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  text-align: center;
  box-shadow: var(--shadow-sm);
  border: 2px solid var(--light-gray);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary-blue), var(--primary-orange));
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-blue);
    
    &::before {
      transform: scaleX(1);
    }
  }
  
  &:active {
    transform: translateY(-2px);
  }
`;

const QuickActionIcon = styled.div`
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-lg);
  color: var(--white);
  font-size: 28px;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  
  ${QuickActionCard}:hover & {
    transform: scale(1.1);
    box-shadow: var(--shadow-lg);
  }
`;

const QuickActionTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
`;

const QuickActionDesc = styled.p`
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.4;
`;

// Metrikler - Kompakt
const MetricsSection = styled.div`
  margin: var(--spacing-xl) 0;
  animation: ${css`${slideIn} 0.6s ease-out 0.6s both`};
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }
`;

const MetricCard = styled.div`
  background: var(--white);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  text-align: center;
  box-shadow: var(--shadow-sm);
  border: 2px solid var(--light-gray);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary-blue), var(--primary-green));
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-blue);
    
    &::before {
      transform: scaleX(1);
    }
  }
`;

const MetricIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-md);
  color: var(--white);
  font-size: 20px;
`;

const MetricValue = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
`;

const MetricLabel = styled.div`
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
`;

// Ürünler Bölümü - Daha Görünür
const ProductsSection = styled.div`
  margin: var(--spacing-xl) 0;
  animation: ${css`${slideIn} 0.6s ease-out 0.9s both`};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
`;

const ViewAllButton = styled.button`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: transparent;
  border: 1px solid var(--primary-blue);
  color: var(--primary-blue);
  border-radius: var(--radius-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--primary-blue);
    color: var(--white);
    transform: translateY(-1px);
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Özellikler Bölümü - Temiz
const FeaturesSection = styled.div`
  background: var(--light-gray);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl) var(--spacing-lg);
  margin: var(--spacing-xl) 0;
  animation: ${css`${slideIn} 0.6s ease-out 1.2s both`};
`;

const FeaturesTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xl);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
`;

const FeatureCard = styled.div`
  background: var(--white);
  padding: var(--spacing-xl);
  border-radius: var(--radius-md);
  text-align: center;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--medium-gray);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-md);
  }
`;

const FeatureIcon = styled.div`
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-lg);
  color: var(--white);
  font-size: 24px;
`;

const FeatureTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
`;

const FeatureDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.5;
  font-size: 14px;
`;

// Status Badge - En altta
const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: linear-gradient(135deg, var(--success), var(--secondary-green));
  color: var(--white);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-top: var(--spacing-lg);
  
  &::before {
    content: '●';
    animation: ${css`${pulse} 2s infinite`};
  }
`;

// Loading Skeleton
const SkeletonCard = styled.div`
  background: var(--white);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--medium-gray);
  animation: ${css`${pulse} 1.5s infinite`};
`;

const SkeletonImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(90deg, var(--light-gray) 25%, var(--medium-gray) 50%, var(--light-gray) 75%);
  border-radius: var(--radius-sm);
  margin-bottom: var(--spacing-md);
`;

const SkeletonText = styled.div`
  height: 16px;
  background: linear-gradient(90deg, var(--light-gray) 25%, var(--medium-gray) 50%, var(--light-gray) 75%);
  border-radius: var(--radius-sm);
  margin-bottom: var(--spacing-sm);
  
  &:last-child {
    width: 60%;
  }
`;

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // Authentication durumuna göre farklı mesajlar (kullanılacak)
  const getWelcomeMessage = () => {
    return isAuthenticated ? 'Hoş geldiniz! AI asistanınız hazır.' : 'Giriş yaparak tüm özelliklerden yararlanın.';
  };
  
  // Mesajı göster (kullanılacak)
  const welcomeMessage = getWelcomeMessage();
  console.log('Welcome message:', welcomeMessage); // Demo için log

  // Ana CTA
  const handlePrimaryCTA = () => {
    navigate('/chatbot');
    toast.success('AI Asistanına yönlendiriliyorsunuz...');
  };

  // Hızlı aksiyonlar
  const handleQuickAction = (action) => {
    switch (action) {
      case 'search':
        navigate('/search');
        toast.success('Akıllı arama sayfasına yönlendiriliyorsunuz...');
        break;
      case 'products':
        navigate('/products');
        toast.success('Ürün kataloğuna yönlendiriliyorsunuz...');
        break;
      case 'tracking':
        navigate('/price-tracking');
        toast.success('Fiyat takibi sayfasına yönlendiriliyorsunuz...');
        break;
      case 'demo':
        toast.success('Demo başlatılıyor...');
        setTimeout(() => {
          navigate('/chatbot');
        }, 1000);
        break;
      default:
        break;
    }
  };

  // Ürün işlemleri
  const handleAddToCart = (product) => {
    toast.success(`${product.name} sepete eklendi!`);
  };

  const handleAddToFavorites = (product) => {
    toast.success(`${product.name} favorilere eklendi!`);
  };

  const handleProductClick = (product) => {
    toast.success(`${product.name} detayları açılıyor...`);
    // Gerçek uygulamada ürün detay sayfasına yönlendirir
    navigate(`/products/${product.id}`);
  };

  const handleViewAllProducts = () => {
    navigate('/products');
    toast.success('Tüm ürünlere yönlendiriliyorsunuz...');
  };

  // Ürünleri yükle
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/ecommerce/search?limit=6');
        const data = await response.json();
        setFeaturedProducts(data.products || []);
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Ürünler yüklenirken hata:', error);
        // Fallback ürünler
        setFeaturedProducts([
          {
            id: 1,
            name: "iPhone 15 Pro",
            price: 45000,
            rating: 4.8,
            image: "https://via.placeholder.com/300x300?text=iPhone+15+Pro",
            category: "Telefon",
            brand: "Apple",
            description: "A17 Pro çip ile güçlendirilmiş, 48MP kamera sistemi"
          },
          {
            id: 2,
            name: "Samsung Galaxy S24",
            price: 38000,
            rating: 4.7,
            image: "https://via.placeholder.com/300x300?text=Galaxy+S24",
            category: "Telefon",
            brand: "Samsung",
            description: "AI destekli kamera sistemi, uzun pil ömrü"
          },
          {
            id: 3,
            name: "Nike Air Max",
            price: 1200,
            rating: 4.6,
            image: "https://via.placeholder.com/300x300?text=Nike+Air+Max",
            category: "Spor Ayakkabı",
            brand: "Nike",
            description: "Maksimum konfor ve stil için tasarlanmış"
          }
        ]);
        setLastUpdated(new Date());
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <HomeContainer>
      {/* Hero - Daha Kompakt */}
      <Hero>
        <Logo>
          <LogoIcon>
            <Brain size={28} />
          </LogoIcon>
          <Title>ShopWise</Title>
        </Logo>
        <Subtitle>
          AI destekli e-ticaret asistanınız
        </Subtitle>
      </Hero>

      {/* CTA - Sadece Ana Buton */}
      <CTASection>
        <PrimaryCTA onClick={handlePrimaryCTA}>
          <MessageCircle size={24} />
          Sohbete Başla
          <ArrowRight size={20} />
        </PrimaryCTA>
      </CTASection>

      {/* Hızlı Aksiyonlar */}
      <QuickActions>
        <QuickActionCard onClick={() => handleQuickAction('search')}>
          <QuickActionIcon>
            <Search size={20} />
          </QuickActionIcon>
          <QuickActionTitle>Akıllı Arama</QuickActionTitle>
          <QuickActionDesc>Ürün, kategori veya marka ara</QuickActionDesc>
        </QuickActionCard>
        
        <QuickActionCard onClick={() => handleQuickAction('products')}>
          <QuickActionIcon>
            <Package size={20} />
          </QuickActionIcon>
          <QuickActionTitle>Ürün Kataloğu</QuickActionTitle>
          <QuickActionDesc>Tüm ürünleri keşfet</QuickActionDesc>
        </QuickActionCard>
        
        <QuickActionCard onClick={() => handleQuickAction('tracking')}>
          <QuickActionIcon>
            <TrendingUp size={20} />
          </QuickActionIcon>
          <QuickActionTitle>Fiyat Takibi</QuickActionTitle>
          <QuickActionDesc>İndirimleri kaçırma</QuickActionDesc>
        </QuickActionCard>
        
        <QuickActionCard onClick={() => handleQuickAction('demo')}>
          <QuickActionIcon>
            <Play size={20} />
          </QuickActionIcon>
          <QuickActionTitle>Demo İzle</QuickActionTitle>
          <QuickActionDesc>Nasıl çalıştığını gör</QuickActionDesc>
        </QuickActionCard>
      </QuickActions>

      {/* Metrikler - Kompakt */}
      <MetricsSection>
        <MetricsGrid>
          <MetricCard>
            <MetricIcon>
              <CheckCircle size={20} />
            </MetricIcon>
            <MetricValue>98.7%</MetricValue>
            <MetricLabel>Doğruluk Oranı</MetricLabel>
          </MetricCard>
          <MetricCard>
            <MetricIcon>
              <Zap size={20} />
            </MetricIcon>
            <MetricValue>0.8s</MetricValue>
            <MetricLabel>Ortalama Yanıt</MetricLabel>
          </MetricCard>
          <MetricCard>
            <MetricIcon>
              <Users size={20} />
            </MetricIcon>
            <MetricValue>2.8K</MetricValue>
            <MetricLabel>Günlük Sorgu</MetricLabel>
          </MetricCard>
        </MetricsGrid>
      </MetricsSection>

      {/* Öne Çıkan Ürünler */}
      <ProductsSection>
        <SectionHeader>
          <SectionTitle>
            <Package size={28} />
            Öne Çıkan Ürünler
          </SectionTitle>
          <ViewAllButton onClick={handleViewAllProducts}>
            <ExternalLink size={16} />
            Tümünü Gör
          </ViewAllButton>
        </SectionHeader>
        <ProductsGrid>
          {loading ? (
            // Skeleton loader
            Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCard key={index}>
                <SkeletonImage />
                <SkeletonText />
                <SkeletonText />
                <SkeletonText />
              </SkeletonCard>
            ))
          ) : (
            featuredProducts.map((product) => (
              <div key={product.id} onClick={() => handleProductClick(product)}>
                <ProductCard
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                  onAddToFavorites={() => handleAddToFavorites(product)}
                />
              </div>
            ))
          )}
        </ProductsGrid>
      </ProductsSection>

      {/* Özellikler - Temiz */}
      <FeaturesSection>
        <FeaturesTitle>
          <Sparkles size={28} />
          AI Destekli Özellikler
        </FeaturesTitle>
        <FeaturesGrid>
          <FeatureCard onClick={() => handleQuickAction('demo')}>
            <FeatureIcon>
              <Brain size={24} />
            </FeatureIcon>
            <FeatureTitle>Akıllı Chatbot</FeatureTitle>
            <FeatureDescription>
              Gemini AI ile doğal dil işleme, ürün önerileri ve müşteri desteği
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard onClick={() => handleQuickAction('search')}>
            <FeatureIcon>
              <Search size={24} />
            </FeatureIcon>
            <FeatureTitle>Akıllı Arama</FeatureTitle>
            <FeatureDescription>
              Görsel ve sesli arama, fiyat karşılaştırması ve trend analizi
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard onClick={() => handleQuickAction('tracking')}>
            <FeatureIcon>
              <TrendingUp size={24} />
            </FeatureIcon>
            <FeatureTitle>Fiyat Takibi</FeatureTitle>
            <FeatureDescription>
              Otomatik fiyat izleme, indirim uyarıları ve en iyi zaman analizi
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard onClick={() => handleQuickAction('products')}>
            <FeatureIcon>
              <ShoppingCart size={24} />
            </FeatureIcon>
            <FeatureTitle>Akıllı Sepet</FeatureTitle>
            <FeatureDescription>
              Kişiselleştirilmiş öneriler, stok kontrolü ve hızlı ödeme
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard onClick={() => handleQuickAction('demo')}>
            <FeatureIcon>
              <Star size={24} />
            </FeatureIcon>
            <FeatureTitle>Yorum Analizi</FeatureTitle>
            <FeatureDescription>
              AI destekli yorum özetleme ve duygu analizi
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard onClick={() => handleQuickAction('demo')}>
            <FeatureIcon>
              <Shield size={24} />
            </FeatureIcon>
            <FeatureTitle>Güvenli Alışveriş</FeatureTitle>
            <FeatureDescription>
              Korumalı ödeme sistemi ve güvenlik garantisi
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      {/* Status Badge - En altta */}
      <StatusBadge>
        <Clock size={12} />
        Son güncelleme: {lastUpdated.toLocaleTimeString()}
      </StatusBadge>
    </HomeContainer>
  );
}

export default Home; 