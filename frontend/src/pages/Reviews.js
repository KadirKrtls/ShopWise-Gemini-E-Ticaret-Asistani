import React, { useState } from 'react';
import styled from 'styled-components';
import { Star, MessageSquare, TrendingUp, BarChart3 } from 'lucide-react';
import { useMutation } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const ReviewsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 1.125rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const Card = styled.div`
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
    background: linear-gradient(90deg, #f59e0b, #d97706);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const CardIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
`;

const CardDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const AnalysisSection = styled.div`
  background: white;
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  margin-bottom: 2rem;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #2563eb;
  }
  
  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
  }
`;

const ResultsContainer = styled.div`
  background: #f8fafc;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-top: 1rem;
`;

const ResultItem = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  border-left: 4px solid #3b82f6;
`;

const ResultTitle = styled.h4`
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const ResultText = styled.p`
  color: #64748b;
  line-height: 1.6;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Tag = styled.span`
  padding: 0.25rem 0.75rem;
  background: ${props => props.positive ? '#dcfce7' : '#fef2f2'};
  color: ${props => props.positive ? '#166534' : '#dc2626'};
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
`;

const RatingDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Stars = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const StarIcon = styled.span`
  color: ${props => props.filled ? '#fbbf24' : '#d1d5db'};
`;

function Reviews() {
  const [productId, setProductId] = useState('');
  const [reviews, setReviews] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  const analyzeReviewsMutation = useMutation(
    async (data) => {
      const response = await axios.post('/api/v1/reviews/analyze-bulk', data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        setAnalysisResult(data);
        toast.success('Yorum analizi tamamlandı!');
      },
      onError: (error) => {
        toast.error('Yorum analizi yapılamadı.');
        console.error('Analyze reviews error:', error);
      }
    }
  );

  const analyzeProductReviewsMutation = useMutation(
    async (productId) => {
      const response = await axios.post(`/api/v1/reviews/analyze/${productId}`);
      return response.data;
    },
    {
      onSuccess: (data) => {
        setAnalysisResult(data);
        toast.success('Ürün yorumları analiz edildi!');
      },
      onError: (error) => {
        toast.error('Ürün yorumları analiz edilemedi.');
        console.error('Analyze product reviews error:', error);
      }
    }
  );

  const handleAnalyzeReviews = (e) => {
    e.preventDefault();
    if (!reviews.trim()) {
      toast.error('Lütfen analiz edilecek yorumları girin.');
      return;
    }
    
    const reviewsList = reviews.split('\n').filter(review => review.trim());
    analyzeReviewsMutation.mutate(reviewsList);
  };

  const handleAnalyzeProduct = () => {
    if (!productId) {
      toast.error('Lütfen ürün ID girin.');
      return;
    }
    analyzeProductReviewsMutation.mutate(productId);
  };

  const features = [
    {
      icon: <Star size={20} />,
      bgColor: '#f59e0b',
      title: 'Duygu Analizi',
      description: 'Yorumların olumlu/olumsuz yönlerini analiz eder ve genel duygu durumunu belirler.'
    },
    {
      icon: <MessageSquare size={20} />,
      bgColor: '#3b82f6',
      title: 'Yorum Özeti',
      description: 'Uzun yorum listelerini kısa ve öz özetlere dönüştürür.'
    },
    {
      icon: <TrendingUp size={20} />,
      bgColor: '#10b981',
      title: 'Trend Analizi',
      description: 'Zaman içindeki yorum trendlerini analiz eder ve değişimleri gösterir.'
    },
    {
      icon: <BarChart3 size={20} />,
      bgColor: '#8b5cf6',
      title: 'İstatistiksel Analiz',
      description: 'Rating dağılımları, ortalama puanlar ve detaylı istatistikler sunar.'
    }
  ];

  return (
    <ReviewsContainer>
      <Header>
        <Title>Yorum Analizi</Title>
        <Subtitle>Gemini AI ile yorumları analiz edin ve içgörüler elde edin</Subtitle>
      </Header>

      <Grid>
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <CardIcon style={{ backgroundColor: feature.bgColor }}>
                {feature.icon}
              </CardIcon>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardDescription>{feature.description}</CardDescription>
          </Card>
        ))}
      </Grid>

      <AnalysisSection>
        <SectionTitle>Yorum Analizi</SectionTitle>
        
        <Form onSubmit={handleAnalyzeReviews}>
          <FormGroup>
            <Label>Yorumlar (her satıra bir yorum)</Label>
            <Textarea
              value={reviews}
              onChange={(e) => setReviews(e.target.value)}
              placeholder="Yorumları buraya yapıştırın, her satıra bir yorum gelecek şekilde..."
            />
          </FormGroup>
          
          <Button type="submit" disabled={analyzeReviewsMutation.isLoading}>
            {analyzeReviewsMutation.isLoading ? 'Analiz Ediliyor...' : 'Yorumları Analiz Et'}
          </Button>
        </Form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
          <span style={{ color: '#64748b', fontSize: '0.875rem' }}>VEYA</span>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'end' }}>
          <FormGroup style={{ flex: 1 }}>
            <Label>Ürün ID</Label>
            <Input
              type="number"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="Analiz edilecek ürünün ID'si"
            />
          </FormGroup>
          
          <Button 
            onClick={handleAnalyzeProduct}
            disabled={analyzeProductReviewsMutation.isLoading}
          >
            {analyzeProductReviewsMutation.isLoading ? 'Analiz Ediliyor...' : 'Ürün Yorumlarını Analiz Et'}
          </Button>
        </div>
      </AnalysisSection>

      {analysisResult && (
        <ResultsContainer>
          <SectionTitle>Analiz Sonuçları</SectionTitle>
          
          <ResultItem>
            <ResultTitle>Genel Özet</ResultTitle>
            <ResultText>{analysisResult.analysis?.summary || 'Özet bulunamadı'}</ResultText>
          </ResultItem>

          {analysisResult.analysis?.positive_aspects && (
            <ResultItem>
              <ResultTitle>Olumlu Yönler</ResultTitle>
              <TagList>
                {analysisResult.analysis.positive_aspects.map((aspect, index) => (
                  <Tag key={index} positive>{aspect}</Tag>
                ))}
              </TagList>
            </ResultItem>
          )}

          {analysisResult.analysis?.negative_aspects && (
            <ResultItem>
              <ResultTitle>Olumsuz Yönler</ResultTitle>
              <TagList>
                {analysisResult.analysis.negative_aspects.map((aspect, index) => (
                  <Tag key={index} positive={false}>{aspect}</Tag>
                ))}
              </TagList>
            </ResultItem>
          )}

          {analysisResult.analysis?.rating_estimate && (
            <ResultItem>
              <ResultTitle>Tahmini Puan</ResultTitle>
              <RatingDisplay>
                <Stars>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} filled={star <= analysisResult.analysis.rating_estimate}>
                      ★
                    </StarIcon>
                  ))}
                </Stars>
                <span style={{ color: '#64748b' }}>
                  {analysisResult.analysis.rating_estimate}/5
                </span>
              </RatingDisplay>
            </ResultItem>
          )}

          {analysisResult.total_reviews && (
            <ResultItem>
              <ResultTitle>İstatistikler</ResultTitle>
              <ResultText>
                Toplam {analysisResult.total_reviews} yorum analiz edildi.
                {analysisResult.average_rating && ` Ortalama puan: ${analysisResult.average_rating}/5`}
              </ResultText>
            </ResultItem>
          )}
        </ResultsContainer>
      )}
    </ReviewsContainer>
  );
}

export default Reviews; 