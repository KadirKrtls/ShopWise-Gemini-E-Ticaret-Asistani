import React, { useState } from 'react';
import styled from 'styled-components';
import { MapPin, CheckCircle, AlertCircle, Edit3 } from 'lucide-react';
import { useMutation } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddressesContainer = styled.div`
  max-width: 800px;
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

const FormSection = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
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

const Textarea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  min-height: 100px;
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

const ResultCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-left: 4px solid #3b82f6;
`;

const ResultHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ResultIcon = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const ResultTitle = styled.h3`
  font-weight: 600;
  color: #1e293b;
`;

const ResultText = styled.p`
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const AddressComponents = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const ComponentItem = styled.div`
  background: #f1f5f9;
  padding: 0.75rem;
  border-radius: 0.5rem;
`;

const ComponentLabel = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  margin-bottom: 0.25rem;
`;

const ComponentValue = styled.div`
  color: #1e293b;
  font-weight: 500;
`;

const ValidationResult = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
  ${props => props.isValid 
    ? 'background: #dcfce7; color: #166534;' 
    : 'background: #fef2f2; color: #dc2626;'
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
`;

const FeatureHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const FeatureIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const FeatureTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
`;

const FeatureDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
`;

function Addresses() {
  const [address, setAddress] = useState('');
  const [result, setResult] = useState(null);

  const correctAddressMutation = useMutation(
    async (addressData) => {
      const response = await axios.post('/api/v1/addresses/correct', {
        address: addressData
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        setResult(data);
        toast.success('Adres başarıyla düzeltildi!');
      },
      onError: (error) => {
        toast.error('Adres düzeltilemedi.');
        console.error('Correct address error:', error);
      }
    }
  );

  const validateAddressMutation = useMutation(
    async (addressData) => {
      const response = await axios.post('/api/v1/addresses/validate', {
        address: addressData
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        setResult(data);
        toast.success('Adres doğrulama tamamlandı!');
      },
      onError: (error) => {
        toast.error('Adres doğrulanamadı.');
        console.error('Validate address error:', error);
      }
    }
  );

  const formatAddressMutation = useMutation(
    async (addressData) => {
      const response = await axios.post('/api/v1/addresses/format', {
        address: addressData
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        setResult(data);
        toast.success('Adres formatı düzenlendi!');
      },
      onError: (error) => {
        toast.error('Adres formatı düzenlenemedi.');
        console.error('Format address error:', error);
      }
    }
  );

  const handleCorrectAddress = (e) => {
    e.preventDefault();
    if (!address.trim()) {
      toast.error('Lütfen bir adres girin.');
      return;
    }
    correctAddressMutation.mutate(address);
  };

  const handleValidateAddress = () => {
    if (!address.trim()) {
      toast.error('Lütfen bir adres girin.');
      return;
    }
    validateAddressMutation.mutate(address);
  };

  const handleFormatAddress = () => {
    if (!address.trim()) {
      toast.error('Lütfen bir adres girin.');
      return;
    }
    formatAddressMutation.mutate(address);
  };

  const features = [
    {
      icon: <MapPin size={20} />,
      bgColor: '#3b82f6',
      title: 'Adres Düzeltme',
      description: 'Karmaşık veya eksik yazılmış adresleri temizler ve standart formata getirir.'
    },
    {
      icon: <CheckCircle size={20} />,
      bgColor: '#10b981',
      title: 'Adres Doğrulama',
      description: 'Adreslerin geçerliliğini kontrol eder ve eksik bilgileri tespit eder.'
    },
    {
      icon: <Edit3 size={20} />,
      bgColor: '#f59e0b',
      title: 'Format Standardizasyonu',
      description: 'Farklı formatlardaki adresleri standart bir formata dönüştürür.'
    }
  ];

  return (
    <AddressesContainer>
      <Header>
        <Title>Adres Yönetimi</Title>
        <Subtitle>Gemini AI ile adresleri düzeltin, doğrulayın ve standardize edin</Subtitle>
      </Header>

      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard key={index}>
            <FeatureHeader>
              <FeatureIcon style={{ backgroundColor: feature.bgColor }}>
                {feature.icon}
              </FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
            </FeatureHeader>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>

      <FormSection>
        <SectionTitle>Adres İşlemleri</SectionTitle>
        
        <Form onSubmit={handleCorrectAddress}>
          <FormGroup>
            <Label>Adres</Label>
            <Textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Düzeltilecek, doğrulanacak veya formatlanacak adresi buraya yazın..."
            />
          </FormGroup>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button type="submit" disabled={correctAddressMutation.isLoading}>
              {correctAddressMutation.isLoading ? 'Düzeltiliyor...' : 'Adresi Düzelt'}
            </Button>
            
            <Button 
              type="button"
              onClick={handleValidateAddress}
              disabled={validateAddressMutation.isLoading}
              style={{ background: '#10b981' }}
            >
              {validateAddressMutation.isLoading ? 'Doğrulanıyor...' : 'Adresi Doğrula'}
            </Button>
            
            <Button 
              type="button"
              onClick={handleFormatAddress}
              disabled={formatAddressMutation.isLoading}
              style={{ background: '#f59e0b' }}
            >
              {formatAddressMutation.isLoading ? 'Formatlanıyor...' : 'Adresi Formatla'}
            </Button>
          </div>
        </Form>
      </FormSection>

      {result && (
        <ResultsContainer>
          <SectionTitle>Sonuçlar</SectionTitle>
          
          <ResultCard>
            <ResultHeader>
              <ResultIcon style={{ backgroundColor: '#3b82f6' }}>
                <MapPin size={16} />
              </ResultIcon>
              <ResultTitle>Orijinal Adres</ResultTitle>
            </ResultHeader>
            <ResultText>{result.original_address}</ResultText>
          </ResultCard>

          <ResultCard>
            <ResultHeader>
              <ResultIcon style={{ backgroundColor: '#10b981' }}>
                <CheckCircle size={16} />
              </ResultIcon>
              <ResultTitle>
                {result.corrected_address ? 'Düzeltilmiş Adres' : 
                 result.formatted_address ? 'Formatlanmış Adres' : 'Doğrulanmış Adres'}
              </ResultTitle>
            </ResultHeader>
            <ResultText>
              {result.corrected_address || result.formatted_address || result.corrected_address}
            </ResultText>
          </ResultCard>

          {result.components && (
            <ResultCard>
              <ResultHeader>
                <ResultIcon style={{ backgroundColor: '#8b5cf6' }}>
                  <Edit3 size={16} />
                </ResultIcon>
                <ResultTitle>Adres Bileşenleri</ResultTitle>
              </ResultHeader>
              <AddressComponents>
                {Object.entries(result.components).map(([key, value]) => (
                  <ComponentItem key={key}>
                    <ComponentLabel>{key}</ComponentLabel>
                    <ComponentValue>{value}</ComponentValue>
                  </ComponentItem>
                ))}
              </AddressComponents>
            </ResultCard>
          )}

          {result.is_valid !== undefined && (
            <ResultCard>
              <ValidationResult isValid={result.is_valid}>
                {result.is_valid ? (
                  <>
                    <CheckCircle size={16} />
                    <span>Adres geçerli</span>
                  </>
                ) : (
                  <>
                    <AlertCircle size={16} />
                    <span>Adres geçersiz veya eksik bilgi içeriyor</span>
                  </>
                )}
              </ValidationResult>
            </ResultCard>
          )}

          {result.message && (
            <ResultCard>
              <ResultText style={{ color: '#10b981', fontWeight: '500' }}>
                {result.message}
              </ResultText>
            </ResultCard>
          )}
        </ResultsContainer>
      )}
    </AddressesContainer>
  );
}

export default Addresses; 