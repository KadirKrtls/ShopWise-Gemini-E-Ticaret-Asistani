import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { 
  Package, 
  Star, 
  MapPin, 
  Search, 
  TrendingUp,
  Users,
  Zap,
  Brain,
  Sparkles,
  Activity,
  ArrowRight,
  ShoppingCart,
  Scale,
  Bell
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #1e293b, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #64748b;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const pulse = keyframes`
  0%, 100% { 
    opacity: 1; 
    transform: scale(1);
  }
  50% { 
    opacity: 0.9; 
    transform: scale(1.05);
  }
`;

const brainFloat = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

const SystemStatus = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  animation: ${pulse} 2s infinite;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #10b981);
  }
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const StatIcon = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  background: ${props => props.color || '#3b82f6'};
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #64748b;
  font-weight: 500;
`;

const StatChange = styled.div`
  font-size: 0.875rem;
  color: ${props => props.positive ? '#10b981' : '#ef4444'};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.gradient || 'linear-gradient(90deg, #3b82f6, #10b981)'};
  }
`;

const FeatureHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const FeatureIcon = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  background: ${props => props.color || '#3b82f6'};
  position: relative;
  
  ${props => props.animated && `
    animation: ${brainFloat} 3s ease-in-out infinite;
  `}
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const FeatureBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
  animation: ${pulse} 2s infinite;
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
  }
`;

const GeminiHighlight = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 2rem;
  padding: 3rem;
  color: white;
  text-align: center;
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
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const GeminiDescription = styled.p`
  font-size: 1.125rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const GeminiStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const GeminiStat = styled.div`
  text-align: center;
`;

const GeminiStatValue = styled.div`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
`;

const GeminiStatLabel = styled.div`
  font-size: 0.875rem;
  opacity: 0.8;
`;

function Home() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    transactions: 0,
    revenue: 0
  });

  useEffect(() => {
    // Animate numbers
    const animateNumbers = () => {
      const targetStats = {
        users: 1247,
        products: 3421,
        transactions: 8923,
        revenue: 156789
      };

      Object.keys(targetStats).forEach(key => {
        let current = 0;
        const target = targetStats[key];
        const increment = target / 50;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setStats(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, 50);
      });
    };

    animateNumbers();
  }, []);

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <HomeContainer>
      <Hero>
        <Title>ShopWise Dashboard</Title>
        <Subtitle>
          Yapay zekâ destekli akıllı e-ticaret asistanı ile alışveriş deneyiminizi 
          kişiselleştirin ve optimize edin
        </Subtitle>
        <SystemStatus>
          <Activity size={16} />
          🔵 Aktif – Son işlem: 2 dk önce
        </SystemStatus>
      </Hero>

      <GeminiHighlight>
        <GeminiTitle>
          <Brain size={32} />
          Gemini AI Asistanı
          <Sparkles size={24} />
        </GeminiTitle>
        <GeminiDescription>
          Google Gemini teknolojisi ile güçlendirilmiş akıllı öneri sistemi, 
          doğal dil arama ve kişiselleştirilmiş alışveriş deneyimi
        </GeminiDescription>
        <GeminiStats>
          <GeminiStat>
            <GeminiStatValue>98.7%</GeminiStatValue>
            <GeminiStatLabel>Doğruluk Oranı</GeminiStatLabel>
          </GeminiStat>
          <GeminiStat>
            <GeminiStatValue>2.3s</GeminiStatValue>
            <GeminiStatLabel>Ortalama Yanıt</GeminiStatLabel>
          </GeminiStat>
          <GeminiStat>
            <GeminiStatValue>15.2K</GeminiStatValue>
            <GeminiStatLabel>Günlük Sorgu</GeminiStatLabel>
          </GeminiStat>
        </GeminiStats>
      </GeminiHighlight>

      <StatsGrid>
        <StatCard onClick={() => handleCardClick('/products')}>
          <StatHeader>
            <StatIcon color="#3b82f6">
              <Package size={24} />
            </StatIcon>
            <StatChange positive>
              <TrendingUp size={16} />
              +12.5%
            </StatChange>
          </StatHeader>
          <StatValue>{stats.products.toLocaleString()}</StatValue>
          <StatLabel>Toplam Ürün</StatLabel>
        </StatCard>

        <StatCard onClick={() => handleCardClick('/search')}>
          <StatHeader>
            <StatIcon color="#10b981">
              <Users size={24} />
            </StatIcon>
            <StatChange positive>
              <TrendingUp size={16} />
              +8.3%
            </StatChange>
          </StatHeader>
          <StatValue>{stats.users.toLocaleString()}</StatValue>
          <StatLabel>Aktif Kullanıcı</StatLabel>
        </StatCard>

        <StatCard onClick={() => handleCardClick('/chatbot')}>
          <StatHeader>
            <StatIcon color="#f59e0b">
              <ShoppingCart size={24} />
            </StatIcon>
            <StatChange positive>
              <TrendingUp size={16} />
              +15.7%
            </StatChange>
          </StatHeader>
          <StatValue>{stats.transactions.toLocaleString()}</StatValue>
          <StatLabel>Günlük İşlem</StatLabel>
        </StatCard>

        <StatCard onClick={() => handleCardClick('/reviews')}>
          <StatHeader>
            <StatIcon color="#ef4444">
              <Zap size={24} />
            </StatIcon>
            <StatChange positive>
              <TrendingUp size={16} />
              +22.1%
            </StatChange>
          </StatHeader>
          <StatValue>₺{stats.revenue.toLocaleString()}</StatValue>
          <StatLabel>Aylık Gelir</StatLabel>
        </StatCard>
      </StatsGrid>

      <FeaturesGrid>
        <FeatureCard 
          gradient="linear-gradient(90deg, #667eea, #764ba2)"
          onClick={() => handleCardClick('/chatbot')}
        >
          <FeatureHeader>
            <FeatureIcon color="#667eea" animated>
              <Brain size={32} />
            </FeatureIcon>
            <div>
              <FeatureTitle>Gemini ChatBot</FeatureTitle>
              <FeatureBadge>
                <Sparkles size={14} />
                AI Aktif
              </FeatureBadge>
            </div>
          </FeatureHeader>
          <FeatureDescription>
            Doğal dil ile ürün arama, öneri alma ve sorularınızı yanıtlama. 
            Gemini AI teknolojisi ile güçlendirilmiş akıllı asistan.
          </FeatureDescription>
          <ActionButton>
            Sohbete Başla
            <ArrowRight size={16} />
          </ActionButton>
        </FeatureCard>

        <FeatureCard 
          gradient="linear-gradient(90deg, #f093fb, #f5576c)"
          onClick={() => handleCardClick('/search')}
        >
          <FeatureHeader>
            <FeatureIcon color="#f093fb">
              <Search size={32} />
            </FeatureIcon>
            <div>
              <FeatureTitle>Akıllı Arama</FeatureTitle>
              <FeatureBadge>
                <Sparkles size={14} />
                AI Destekli
              </FeatureBadge>
            </div>
          </FeatureHeader>
          <FeatureDescription>
            Görsel arama, sesli komutlar ve doğal dil ile ürün bulma. 
            Gemini AI ile anlamlı sonuçlar ve kişiselleştirilmiş öneriler.
          </FeatureDescription>
          <ActionButton>
            Aramaya Başla
            <ArrowRight size={16} />
          </ActionButton>
        </FeatureCard>

        <FeatureCard 
          gradient="linear-gradient(90deg, #4facfe, #00f2fe)"
          onClick={() => handleCardClick('/comparison')}
        >
          <FeatureHeader>
            <FeatureIcon color="#4facfe">
              <Scale size={32} />
            </FeatureIcon>
            <div>
              <FeatureTitle>Ürün Karşılaştırma</FeatureTitle>
              <FeatureBadge>
                <Sparkles size={14} />
                AI Analiz
              </FeatureBadge>
            </div>
          </FeatureHeader>
          <FeatureDescription>
            Detaylı ürün karşılaştırması ve Gemini AI önerileri. 
            Fiyat, performans ve özellik analizi ile en iyi seçimi yapın.
          </FeatureDescription>
          <ActionButton>
            Karşılaştır
            <ArrowRight size={16} />
          </ActionButton>
        </FeatureCard>

        <FeatureCard 
          gradient="linear-gradient(90deg, #43e97b, #38f9d7)"
          onClick={() => handleCardClick('/price-tracking')}
        >
          <FeatureHeader>
            <FeatureIcon color="#43e97b">
              <Bell size={32} />
            </FeatureIcon>
            <div>
              <FeatureTitle>Fiyat Takibi</FeatureTitle>
              <FeatureBadge>
                <Sparkles size={14} />
                Otomatik
              </FeatureBadge>
            </div>
          </FeatureHeader>
          <FeatureDescription>
            Ürün fiyatlarını takip edin ve düşüşlerde anında bildirim alın. 
            Gemini AI ile fiyat tahminleri ve en uygun alım zamanı önerileri.
          </FeatureDescription>
          <ActionButton>
            Takip Et
            <ArrowRight size={16} />
          </ActionButton>
        </FeatureCard>

        <FeatureCard 
          gradient="linear-gradient(90deg, #fa709a, #fee140)"
          onClick={() => handleCardClick('/reviews')}
        >
          <FeatureHeader>
            <FeatureIcon color="#fa709a">
              <Star size={32} />
            </FeatureIcon>
            <div>
              <FeatureTitle>Yorum Analizi</FeatureTitle>
              <FeatureBadge>
                <Sparkles size={14} />
                AI Özet
              </FeatureBadge>
            </div>
          </FeatureHeader>
          <FeatureDescription>
            Gemini AI ile yorum özetleme ve duygu analizi. 
            Kullanıcı deneyimlerini hızlıca analiz edin ve karar verin.
          </FeatureDescription>
          <ActionButton>
            Analiz Et
            <ArrowRight size={16} />
          </ActionButton>
        </FeatureCard>

        <FeatureCard 
          gradient="linear-gradient(90deg, #a8edea, #fed6e3)"
          onClick={() => handleCardClick('/addresses')}
        >
          <FeatureHeader>
            <FeatureIcon color="#a8edea">
              <MapPin size={32} />
            </FeatureIcon>
            <div>
              <FeatureTitle>Adres Düzeltme</FeatureTitle>
              <FeatureBadge>
                <Sparkles size={14} />
                AI Doğrulama
              </FeatureBadge>
            </div>
          </FeatureHeader>
          <FeatureDescription>
            Eksik veya hatalı adresleri Gemini AI ile düzeltin ve doğrulayın. 
            Teslimat sorunlarını minimize edin.
          </FeatureDescription>
          <ActionButton>
            Düzelt
            <ArrowRight size={16} />
          </ActionButton>
        </FeatureCard>
      </FeaturesGrid>
    </HomeContainer>
  );
}

export default Home; 