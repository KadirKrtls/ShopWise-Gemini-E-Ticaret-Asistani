import React, { useState } from 'react';
import styled from 'styled-components';
import { X, User, Mail, Lock, Phone, Building, Hash } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background: #f5f5f5;
    color: #333;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  font-size: 1.8rem;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-radius: 12px;
  background: #f8f9fa;
  padding: 4px;
`;

const Tab = styled.button`
  flex: 1;
  padding: 12px;
  border: none;
  background: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? '#333' : '#666'};
  border-radius: 8px;
  font-weight: ${props => props.active ? '600' : '400'};
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;

const RoleSelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const RoleButton = styled.button`
  flex: 1;
  padding: 1rem;
  border: 2px solid ${props => props.selected ? '#007bff' : '#e9ecef'};
  background: ${props => props.selected ? '#007bff' : 'white'};
  color: ${props => props.selected ? 'white' : '#333'};
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #007bff;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px 12px 48px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #007bff;
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #adb5bd;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 1rem;

  &:hover {
    background: linear-gradient(135deg, #0056b3, #004085);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SwitchButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 1rem;
  text-align: center;
  width: 100%;

  &:hover {
    color: #0056b3;
  }
`;

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('customer');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    full_name: '',
    phone: '',
    company_name: '',
    tax_number: ''
  });
  
  const { login, register, isLoading } = useAuth();

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLogin) {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        onClose();
      }
    } else {
      const userData = {
        ...formData,
        role
      };
      const result = await register(userData);
      if (result.success) {
        onClose();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      username: '',
      full_name: '',
      phone: '',
      company_name: '',
      tax_number: ''
    });
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <X size={24} />
        </CloseButton>
        
        <Title>{isLogin ? 'Giriş Yap' : 'Kayıt Ol'}</Title>
        
        <TabContainer>
          <Tab active={isLogin} onClick={() => setIsLogin(true)}>
            Giriş Yap
          </Tab>
          <Tab active={!isLogin} onClick={() => setIsLogin(false)}>
            Kayıt Ol
          </Tab>
        </TabContainer>

        {!isLogin && (
          <RoleSelector>
            <RoleButton
              selected={role === 'customer'}
              onClick={() => setRole('customer')}
              type="button"
            >
              🛍️ Müşteri
            </RoleButton>
            <RoleButton
              selected={role === 'seller'}
              onClick={() => setRole('seller')}
              type="button"
            >
              🏪 Satıcı
            </RoleButton>
          </RoleSelector>
        )}

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <InputIcon><Mail size={20} /></InputIcon>
            <Input
              type="email"
              name="email"
              placeholder="Email adresiniz"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <InputIcon><Lock size={20} /></InputIcon>
            <Input
              type="password"
              name="password"
              placeholder="Şifreniz"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </InputGroup>

          {!isLogin && (
            <>
              <InputGroup>
                <InputIcon><User size={20} /></InputIcon>
                <Input
                  type="text"
                  name="username"
                  placeholder="Kullanıcı adı"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </InputGroup>

              <InputGroup>
                <InputIcon><User size={20} /></InputIcon>
                <Input
                  type="text"
                  name="full_name"
                  placeholder="Ad Soyad"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  required
                />
              </InputGroup>

              <InputGroup>
                <InputIcon><Phone size={20} /></InputIcon>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Telefon numarası"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </InputGroup>

              {role === 'seller' && (
                <>
                  <InputGroup>
                    <InputIcon><Building size={20} /></InputIcon>
                    <Input
                      type="text"
                      name="company_name"
                      placeholder="Şirket adı"
                      value={formData.company_name}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>

                  <InputGroup>
                    <InputIcon><Hash size={20} /></InputIcon>
                    <Input
                      type="text"
                      name="tax_number"
                      placeholder="Vergi numarası"
                      value={formData.tax_number}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </>
              )}
            </>
          )}

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'İşlem yapılıyor...' : (isLogin ? 'Giriş Yap' : 'Kayıt Ol')}
          </SubmitButton>
        </Form>

        <SwitchButton onClick={switchMode}>
          {isLogin ? 'Hesabınız yok mu? Kayıt olun' : 'Zaten hesabınız var mı? Giriş yapın'}
        </SwitchButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AuthModal;