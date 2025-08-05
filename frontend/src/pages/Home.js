import React from 'react';
import styled from 'styled-components';
import { 
  Bot, 
  Package, 
  Star, 
  MapPin, 
  Search, 
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #64748b;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const GeminiStatus = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 2rem;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
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
    background: linear-gradient(90deg, #3b82f6, #10b981);
  }
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const StatIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const StatTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
`;

const StatDescription = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 0.5rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid #e2e8f0;
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
    background: linear-gradient(90deg, #10b981, #3b82f6);
  }
`;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const FeatureIcon = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.75rem;
`;

const FeatureDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
`;

function Home() {
  const stats = [
    {
      icon: <Bot size={20} />,
      bgColor: '#3b82f6',
      title: 'Gemini AI',
      value: 'Aktif',
      description: 'Yapay zeka destekli asistan'
    },
    {
      icon: <Package size={20} />,
      bgColor: '#10b981',
      title: 'Ürünler',
      value: '1,234',
      description: 'Toplam ürün sayısı'
    },
    {
      icon: <Users size={20} />,
      bgColor: '#f59e0b',
      title: 'Kullanıcılar',
      value: '5,678',
      description: 'Aktif kullanıcı sayısı'
    },
    {
      icon: <Zap size={20} />,
      bgColor: '#ef4444',
      title: 'İşlemler',
      value: '12,345',
      description: 'Günlük işlem sayısı'
    }
  ];

  const features = [
    {
      icon: <Bot size={24} />,
      bgColor: '#3b82f6',
      title: 'Gemini ChatBot',
      description: 'Doğal dil ile ürün arama, öneriler ve müşteri desteği. Yapay zeka destekli akıllı asistan.'
    },
    {
      icon: <Package size={24} />,
      bgColor: '#10b981',
      title: 'Otomatik Ürün Açıklaması',
      description: 'Gemini ile SEO uyumlu, etkileyici ürün açıklamaları otomatik olarak üretilir.'
    },
    {
      icon: <Star size={24} />,
      bgColor: '#f59e0b',
      title: 'Yorum Analizi',
      description: 'Kullanıcı yorumlarını analiz eder, özetler ve duygu analizi yapar.'
    },
    {
      icon: <MapPin size={24} />,
      bgColor: '#8b5cf6',
      title: 'Adres Düzeltme',
      description: 'Karmaşık adresleri temizler ve standart formata getirir.'
    },
    {
      icon: <Search size={24} />,
      bgColor: '#ef4444',
      title: 'Akıllı Arama',
      description: 'Doğal dil ile ürün arama, filtreleme ve öneriler sunar.'
    },
    {
      icon: <TrendingUp size={24} />,
      bgColor: '#06b6d4',
      title: 'Fiyat Takibi',
      description: 'Ürün fiyatlarını izler ve değişikliklerde bildirim gönderir.'
    }
  ];

  return (
    <HomeContainer>
      <Hero>
        <Title>ShopWise Dashboard</Title>
        <Subtitle>
          Gemini destekli akıllı e-ticaret asistanı ile müşteri deneyimini 
          optimize edin ve satışlarınızı artırın.
        </Subtitle>
        <GeminiStatus>
          <Bot size={16} />
          Gemini AI Aktif
        </GeminiStatus>
      </Hero>

      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard key={index}>
            <StatHeader>
              <StatIcon style={{ backgroundColor: stat.bgColor }}>
                {stat.icon}
              </StatIcon>
              <StatTitle>{stat.title}</StatTitle>
            </StatHeader>
            <StatValue>{stat.value}</StatValue>
            <StatDescription>{stat.description}</StatDescription>
          </StatCard>
        ))}
      </StatsGrid>

      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard key={index}>
            <FeatureIcon style={{ backgroundColor: feature.bgColor }}>
              {feature.icon}
            </FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </HomeContainer>
  );
}

export default Home; 