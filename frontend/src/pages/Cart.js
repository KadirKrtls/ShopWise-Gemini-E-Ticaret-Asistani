import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ShoppingCart, Plus, Minus, X, CreditCard, Package, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CartContainer = styled.div`
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

const CartLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-xl);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--light-gray);
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg) 0;
  border-bottom: 1px solid var(--light-gray);
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: 2rem;
  overflow: hidden;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--radius-md);
  }
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
`;

const ItemPrice = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: var(--primary-blue);
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
`;

const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid var(--medium-gray);
  background: var(--white);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--light-gray);
    border-color: var(--primary-blue);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.div`
  min-width: 40px;
  text-align: center;
  font-weight: 600;
  color: var(--text-primary);
`;

const RemoveButton = styled.button`
  background: var(--danger);
  color: var(--white);
  border: none;
  border-radius: var(--radius-sm);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--danger-dark);
    transform: scale(1.05);
  }
`;

const CartSummary = styled.div`
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--light-gray);
  height: fit-content;
  position: sticky;
  top: var(--spacing-lg);
`;

const SummaryTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--light-gray);
  
  &:last-child {
    border-bottom: none;
    font-weight: 700;
    font-size: 18px;
    color: var(--text-primary);
    padding-top: var(--spacing-md);
  }
`;

const CheckoutButton = styled.button`
  width: 100%;
  background: var(--primary-blue);
  color: var(--white);
  border: none;
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-lg);
  
  &:hover {
    background: var(--secondary-blue);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
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

const Button = styled.button`
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--primary-blue);
  color: var(--white);
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  
  &:hover {
    background: var(--secondary-blue);
    transform: translateY(-1px);
  }
`;

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage'dan sepet verilerini oku
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const updateCart = (newCartItems) => {
    setCartItems(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    updateCart(updatedCart);
    toast.success('Miktar güncellendi');
  };

  const handleRemoveItem = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    updateCart(updatedCart);
    toast.success('Ürün sepetten çıkarıldı');
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      // Price string veya number olabilir, güvenli bir şekilde işle
      let price;
      if (typeof item.price === 'string') {
        price = parseFloat(item.price.replace(/[^\d,]/g, '').replace(',', '.'));
      } else if (typeof item.price === 'number') {
        price = item.price;
      } else {
        price = 0; // Fallback
      }
      return total + (price * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 500 ? 0 : 29.99;
  const tax = subtotal * 0.18; // KDV
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Sepetiniz boş!');
      return;
    }
    
    toast.success('Ödeme sayfasına yönlendiriliyorsunuz...');
    // Gerçek uygulamada ödeme sayfasına yönlendirir
    setTimeout(() => {
      toast.success('Siparişiniz başarıyla oluşturuldu!');
      updateCart([]);
    }, 2000);
  };

  const handleContinueShopping = () => {
    navigate('/search');
    toast.success('Alışverişe devam edin!');
  };

  if (cartItems.length === 0) {
    return (
      <CartContainer>
        <Header>
          <Title>
            <ShoppingCart size={28} />
            Sepetim
          </Title>
          <Subtitle>Sepetinizde ürün bulunmuyor</Subtitle>
        </Header>
        
        <EmptyState>
          <EmptyIcon>🛒</EmptyIcon>
          <EmptyTitle>Sepetiniz boş</EmptyTitle>
          <EmptyText>
            Alışverişe başlayın ve beğendiğiniz ürünleri sepete ekleyin
          </EmptyText>
          <Button onClick={handleContinueShopping}>
            <Package size={16} />
            Alışverişe Başla
          </Button>
        </EmptyState>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <Header>
        <Title>
          <ShoppingCart size={28} />
          Sepetim ({cartItems.length} ürün)
        </Title>
        <Subtitle>Sepetinizdeki ürünleri gözden geçirin</Subtitle>
      </Header>

      <CartLayout>
        <CartItems>
          {cartItems.map((item) => (
            <CartItem key={item.id}>
              <ItemImage>
                <img src={item.image} alt={item.name} />
              </ItemImage>
              
              <ItemDetails>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>
                  {item.priceDisplay || (typeof item.price === 'number' ? `${item.price.toLocaleString()} TL` : item.price)}
                </ItemPrice>
                
                <QuantityControls>
                  <QuantityButton 
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={16} />
                  </QuantityButton>
                  
                  <QuantityDisplay>{item.quantity}</QuantityDisplay>
                  
                  <QuantityButton 
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus size={16} />
                  </QuantityButton>
                  
                  <RemoveButton 
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <X size={16} />
                  </RemoveButton>
                </QuantityControls>
              </ItemDetails>
            </CartItem>
          ))}
        </CartItems>

        <CartSummary>
          <SummaryTitle>Sipariş Özeti</SummaryTitle>
          
          <SummaryRow>
            <span>Ara Toplam:</span>
            <span>{subtotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} TL</span>
          </SummaryRow>
          
          <SummaryRow>
            <span>Kargo:</span>
            <span>
              {shipping === 0 ? (
                <span style={{ color: 'var(--success)' }}>Ücretsiz</span>
              ) : (
                `${shipping.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} TL`
              )}
            </span>
          </SummaryRow>
          
          <SummaryRow>
            <span>KDV (%18):</span>
            <span>{tax.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} TL</span>
          </SummaryRow>
          
          <SummaryRow>
            <span>Toplam:</span>
            <span>{total.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} TL</span>
          </SummaryRow>
          
          {shipping > 0 && (
            <div style={{ 
              marginTop: 'var(--spacing-md)', 
              padding: 'var(--spacing-sm)', 
              background: 'var(--warning-light)', 
              borderRadius: 'var(--radius-sm)', 
              fontSize: '14px',
              color: 'var(--warning-dark)'
            }}>
              <Truck size={16} style={{ marginRight: '8px' }} />
              500 TL ve üzeri alışverişlerde kargo ücretsiz!
            </div>
          )}
          
          <CheckoutButton onClick={handleCheckout}>
            <CreditCard size={20} />
            Ödemeye Geç
          </CheckoutButton>
        </CartSummary>
      </CartLayout>
    </CartContainer>
  );
}

export default Cart;