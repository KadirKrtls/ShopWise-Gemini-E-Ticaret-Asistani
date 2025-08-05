import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { 
  Home, 
  MessageCircle, 
  Package, 
  Star, 
  MapPin, 
  Search,
  Scale,
  Bell,
  Settings,
  HelpCircle
} from 'lucide-react';

const SidebarContainer = styled.aside`
  width: 280px;
  background: white;
  border-right: 1px solid #e2e8f0;
  padding: 2rem 0;
  overflow-y: auto;
`;

const NavSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0 2rem;
  margin-bottom: 0.75rem;
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 2rem;
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
  
  &:hover {
    background: #f8fafc;
    color: #3b82f6;
  }
  
  &.active {
    background: #eff6ff;
    color: #3b82f6;
    border-left-color: #3b82f6;
  }
`;

const IconWrapper = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Sidebar() {
  const menuItems = [
    {
      title: 'Ana Sayfa',
      icon: <Home size={18} />,
      path: '/'
    },
    {
      title: 'Chatbot',
      icon: <MessageCircle size={18} />,
      path: '/chatbot'
    },
    {
      title: 'Ürünler',
      icon: <Package size={18} />,
      path: '/products'
    },
    {
      title: 'Yorumlar',
      icon: <Star size={18} />,
      path: '/reviews'
    },
    {
      title: 'Adresler',
      icon: <MapPin size={18} />,
      path: '/addresses'
    },
    {
      title: 'Arama',
      icon: <Search size={18} />,
      path: '/search'
    },
    {
      title: 'Ürün Karşılaştırma',
      icon: <Scale size={18} />,
      path: '/comparison'
    },
    {
      title: 'Fiyat Takibi',
      icon: <Bell size={18} />,
      path: '/price-tracking'
    }
  ];

  const secondaryItems = [
    {
      title: 'Ayarlar',
      icon: <Settings size={18} />,
      path: '/settings'
    },
    {
      title: 'Yardım',
      icon: <HelpCircle size={18} />,
      path: '/help'
    }
  ];

  return (
    <SidebarContainer>
      <NavSection>
        <SectionTitle>Ana Modüller</SectionTitle>
        <NavList>
          {menuItems.map((item) => (
            <NavItem key={item.path} to={item.path}>
              <IconWrapper>
                {item.icon}
              </IconWrapper>
              {item.title}
            </NavItem>
          ))}
        </NavList>
      </NavSection>
      
      <NavSection>
        <SectionTitle>Diğer</SectionTitle>
        <NavList>
          {secondaryItems.map((item) => (
            <NavItem key={item.path} to={item.path}>
              <IconWrapper>
                {item.icon}
              </IconWrapper>
              {item.title}
            </NavItem>
          ))}
        </NavList>
      </NavSection>
    </SidebarContainer>
  );
}

export default Sidebar; 