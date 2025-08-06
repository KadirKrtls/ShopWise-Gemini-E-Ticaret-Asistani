import React, { useState } from 'react';
import styled from 'styled-components';
import { ShoppingBag, MessageCircle, User, LogOut, LogIn, Store, Search, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';

const HeaderContainer = styled.header`
  background: var(--white);
  border-bottom: 1px solid var(--medium-gray);
  padding: var(--spacing-md) var(--spacing-xl);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: 24px;
  font-weight: 800;
  color: var(--primary-blue);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
  }
`;

const LogoIcon = styled.div`
  background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
  color: var(--white);
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: var(--light-gray);
  border-radius: var(--radius-lg);
  padding: var(--spacing-sm) var(--spacing-md);
  min-width: 400px;
  border: 1px solid var(--medium-gray);
  transition: all 0.3s ease;
  
  &:focus-within {
    border-color: var(--primary-blue);
    box-shadow: 0 0 0 3px rgba(30, 136, 229, 0.1);
  }
  
  @media (max-width: 768px) {
    min-width: 200px;
  }
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  color: var(--text-primary);
  flex: 1;
  margin-left: var(--spacing-sm);
  
  &::placeholder {
    color: var(--text-muted);
  }
`;

const SearchButton = styled.button`
  background: var(--primary-blue);
  color: var(--white);
  border: none;
  border-radius: var(--radius-sm);
  padding: var(--spacing-sm);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--secondary-blue);
    transform: scale(1.05);
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--text-secondary);
  font-weight: 500;
  cursor: pointer;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--primary-blue);
    background: var(--light-gray);
    transform: translateY(-1px);
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
`;

const AuthButton = styled.button`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-lg);
  border: 2px solid var(--primary-blue);
  border-radius: var(--radius-md);
  background: var(--white);
  color: var(--primary-blue);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--primary-blue);
    color: var(--white);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--light-gray);
  border: 1px solid var(--medium-gray);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
  }
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
  color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const UserName = styled.span`
  font-weight: 600;
  color: var(--text-primary);
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserRole = styled.span`
  font-size: 12px;
  color: var(--text-muted);
  text-transform: capitalize;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  transition: all 0.3s ease;

  &:hover {
    color: var(--error);
    background: #ffebee;
    transform: scale(1.1);
  }
`;

const NotificationBadge = styled.div`
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    right: -2px;
    width: 8px;
    height: 8px;
    background: var(--error);
    border-radius: 50%;
    border: 2px solid var(--white);
  }
`;

function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const getRoleText = (role) => {
    switch (role) {
      case 'customer': return 'Müşteri';
      case 'seller': return 'Satıcı';
      case 'admin': return 'Admin';
      default: return role;
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'customer': return <User size={10} />;
      case 'seller': return <Store size={10} />;
      default: return <User size={10} />;
    }
  };

  const getUserInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleAsistantClick = () => {
    navigate('/chatbot');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <HeaderContainer>
      <HeaderLeft>
        <Logo onClick={handleLogoClick}>
          <LogoIcon>
            <ShoppingBag size={20} />
          </LogoIcon>
          ShopWise
        </Logo>
        
        <form onSubmit={handleSearch}>
          <SearchBar>
            <Search size={18} color="var(--text-muted)" />
            <SearchInput
              type="text"
              placeholder="Ürün, kategori veya marka ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchButton type="submit">
              <Search size={16} />
            </SearchButton>
          </SearchBar>
        </form>
      </HeaderLeft>
      
      <HeaderRight>
        <NavItem onClick={handleAsistantClick}>
          <MessageCircle size={18} />
          Asistan
        </NavItem>

        <NotificationBadge>
          <NavItem>
            <Bell size={18} />
          </NavItem>
        </NotificationBadge>

        <UserSection>
          {isAuthenticated ? (
            <UserInfo>
              <UserAvatar>
                {getUserInitials(user.full_name)}
              </UserAvatar>
              <UserDetails>
                <UserName>{user.full_name}</UserName>
                <UserRole>
                  {getRoleIcon(user.role)}
                  {getRoleText(user.role)}
                </UserRole>
              </UserDetails>
              <LogoutButton onClick={logout} title="Çıkış Yap">
                <LogOut size={16} />
              </LogoutButton>
            </UserInfo>
          ) : (
            <AuthButton onClick={() => setIsAuthModalOpen(true)}>
              <LogIn size={16} />
              Giriş Yap
            </AuthButton>
          )}
        </UserSection>
      </HeaderRight>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </HeaderContainer>
  );
}

export default Header; 