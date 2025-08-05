import React, { useState } from 'react';
import styled from 'styled-components';
import { Plus, Package, Sparkles, Star, TrendingUp } from 'lucide-react';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProductsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
`;

const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
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
  position: relative;
`;

const GeminiBadge = styled.div`
  position: absolute;
  top: -8px;
  right: 0;
  background: #10b981;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #64748b;
  
  &:hover {
    color: #1e293b;
  }
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
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.primary ? `
    background: #3b82f6;
    color: white;
    border: none;
    
    &:hover {
      background: #2563eb;
    }
  ` : `
    background: white;
    color: #64748b;
    border: 1px solid #d1d5db;
    
    &:hover {
      background: #f8fafc;
    }
  `}
`;

const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

function Products() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    brand: '',
    stock: '',
    features: ''
  });

  const createProductMutation = useMutation(
    async (productData) => {
      const response = await axios.post('/api/v1/products/', productData);
      return response.data;
    },
    {
      onSuccess: () => {
        toast.success('Ürün başarıyla oluşturuldu!');
        setShowModal(false);
        setFormData({
          name: '',
          category: '',
          price: '',
          brand: '',
          stock: '',
          features: ''
        });
      },
      onError: (error) => {
        toast.error('Ürün oluşturulamadı. Lütfen tekrar deneyin.');
        console.error('Create product error:', error);
      }
    }
  );

  const generateDescriptionMutation = useMutation(
    async (data) => {
      const response = await axios.post('/api/v1/products/generate-description', {
        product_name: data.name,
        category: data.category,
        features: data.features.split(',').map(f => f.trim()).filter(f => f)
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        toast.success('Ürün açıklaması oluşturuldu!');
        console.log('Generated description:', data.description);
      },
      onError: (error) => {
        toast.error('Açıklama oluşturulamadı.');
        console.error('Generate description error:', error);
      }
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      features: formData.features.split(',').map(f => f.trim()).filter(f => f)
    };
    createProductMutation.mutate(productData);
  };

  const handleGenerateDescription = () => {
    if (!formData.name || !formData.category) {
      toast.error('Lütfen ürün adı ve kategori girin.');
      return;
    }
    generateDescriptionMutation.mutate(formData);
  };

  const features = [
    {
      icon: <Package size={20} />,
      bgColor: '#3b82f6',
      title: 'Ürün Yönetimi',
      description: 'Yeni ürünler ekleyin, mevcut ürünleri düzenleyin ve stok takibi yapın.'
    },
    {
      icon: <Sparkles size={20} />,
      bgColor: '#10b981',
      title: 'Otomatik Açıklama',
      description: 'Gemini AI ile SEO uyumlu ürün açıklamaları otomatik olarak oluşturun.'
    },
    {
      icon: <Star size={20} />,
      bgColor: '#f59e0b',
      title: 'Ürün Karşılaştırma',
      description: 'Benzer ürünleri karşılaştırın ve en iyi seçenekleri bulun.'
    },
    {
      icon: <TrendingUp size={20} />,
      bgColor: '#ef4444',
      title: 'Fiyat Takibi',
      description: 'Ürün fiyatlarını izleyin ve değişikliklerde bildirim alın.'
    }
  ];

  return (
    <ProductsContainer>
      <Header>
        <Title>Ürün Yönetimi</Title>
        <CreateButton onClick={() => setShowModal(true)}>
          <Plus size={16} />
          Yeni Ürün
        </CreateButton>
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

      {showModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Yeni Ürün Ekle</ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
            </ModalHeader>
            
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Ürün Adı</Label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Kategori</Label>
                <Input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Fiyat (TL)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Marka</Label>
                <Input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Stok</Label>
                <Input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Özellikler (virgülle ayırın)</Label>
                <Textarea
                  value={formData.features}
                  onChange={(e) => setFormData({...formData, features: e.target.value})}
                  placeholder="Örn: Su geçirmez, Hafif, Dayanıklı"
                />
              </FormGroup>
              
              <ButtonGroup>
                <Button 
                  type="button" 
                  onClick={handleGenerateDescription}
                  disabled={generateDescriptionMutation.isLoading}
                >
                  {generateDescriptionMutation.isLoading ? 'Oluşturuluyor...' : 'Açıklama Oluştur'}
                </Button>
                <Button type="submit" primary disabled={createProductMutation.isLoading}>
                  {createProductMutation.isLoading ? 'Kaydediliyor...' : 'Ürün Ekle'}
                </Button>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </ProductsContainer>
  );
}

export default Products; 