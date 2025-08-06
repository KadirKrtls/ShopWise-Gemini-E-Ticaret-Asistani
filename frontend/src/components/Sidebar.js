import React from 'react';
import styled from 'styled-components';
import { 
  Home, 
  MessageCircle, 
  Search, 
  Package, 
  TrendingUp, 
  Star, 
  Settings, 
  HelpCircle,
  User,
  Store,
  ShoppingCart,
  Heart,
  MapPin,
  BarChart3
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SidebarContainer = styled.aside`
  width: 280px;
  background: var(--white);
  border-right: 1px solid var(--medium-gray);
  height: calc(100vh - 80px);
  overflow-y: auto;
  padding: var(--spacing-lg) 0;
  box-shadow: var(--shadow-sm);
  
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid var(--medium-gray);
  }
`;

const MenuSection = styled.div`
  margin-bottom: var(--spacing-xl);
`;

const SectionTitle = styled.h3`
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--spacing-md);
  padding: 0 var(--spacing-xl);
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  margin-bottom: var(--spacing-xs);
`;

const NavLink = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-xl);
  color: ${props => props.active ? 'var(--primary-blue)' : 'var(--text-secondary)'};
  background: ${props => props.active ? 'var(--light-gray)' : 'transparent'};
  border-right: 3px solid ${props => props.active ? 'var(--primary-blue)' : 'transparent'};
  font-weight: ${props => props.active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--primary-blue);
    background: var(--light-gray);
    transform: translateX(4px);
  }
  
  &:active {
    transform: translateX(2px);
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: inherit;
`;

const RoleBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: ${props => {
    switch (props.role) {
      case 'customer': return '#e3f2fd';
      case 'seller': return '#fff3e0';
      case 'admin': return '#ffebee';
      default: return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch (props.role) {
      case 'customer': return '#1976d2';
      case 'seller': return '#f57c00';
      case 'admin': return '#d32f2f';
      default: return '#666666';
    }
  }};
  border-radius: var(--radius-sm);
  font-size: 11px;
  font-weight: 600;
  margin-left: auto;
`;

const getRoleIcon = (role) => {
  switch (role) {
    case 'customer': return <User size={10} />;
    case 'seller': return <Store size={10} />;
    case 'admin': return <Settings size={10} />;
    default: return <User size={10} />;
  }
};

const getRoleText = (role) => {
  switch (role) {
    case 'customer': return 'Müşteri';
    case 'seller': return 'Satıcı';
    case 'admin': return 'Admin';
    default: return role;
  }
};

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isVisibleForRole = (itemRole) => {
    if (!itemRole) return true;
    if (!isAuthenticated) return itemRole === 'guest';
    return itemRole === user?.role || itemRole === 'all';
  };

  const menuItems = [
    // Ana Menü
    {
      title: 'Menü',
      items: [
        { 
          label: 'Ana Sayfa', 
          icon: <Home size={18} />, 
          path: '/',
          role: 'all'
        },
        { 
          label: 'Asistan', 
          icon: <MessageCircle size={18} />, 
          path: '/chatbot',
          role: 'all'
        },
        { 
          label: 'Akıllı Arama', 
          icon: <Search size={18} />, 
          path: '/search',
          role: 'all'
        }
      ]
    },
    
    // Müşteri Özellikleri
    {
      title: 'Müşteri',
      items: [
        { 
          label: 'Ürünler', 
          icon: <Package size={18} />, 
          path: '/products',
          role: 'customer'
        },
        { 
          label: 'Fiyat Takibi', 
          icon: <TrendingUp size={18} />, 
          path: '/price-tracking',
          role: 'customer'
        },
        { 
          label: 'Favoriler', 
          icon: <Heart size={18} />, 
          path: '/favorites',
          role: 'customer'
        },
        { 
          label: 'Sepet', 
          icon: <ShoppingCart size={18} />, 
          path: '/cart',
          role: 'customer'
        },
        { 
          label: 'Adresler', 
          icon: <MapPin size={18} />, 
          path: '/addresses',
          role: 'customer'
        }
      ]
    },
    
    // Satıcı Özellikleri
    {
      title: 'Satıcı',
      items: [
        { 
          label: 'Ürün Yönetimi', 
          icon: <Package size={18} />, 
          path: '/products',
          role: 'seller'
        },
        { 
          label: 'Satış Analizi', 
          icon: <BarChart3 size={18} />, 
          path: '/analytics',
          role: 'seller'
        },
        { 
          label: 'Yorumlar', 
          icon: <Star size={18} />, 
          path: '/reviews',
          role: 'seller'
        }
      ]
    },
    
    // Destek
    {
      title: 'Destek',
      items: [
        { 
          label: 'Ayarlar', 
          icon: <Settings size={18} />, 
          path: '/settings',
          role: 'all'
        },
        { 
          label: 'Yardım', 
          icon: <HelpCircle size={18} />, 
          path: '/help',
          role: 'all'
        }
      ]
    }
  ];

  return (
    <SidebarContainer>
      {menuItems.map((section, sectionIndex) => (
        <MenuSection key={sectionIndex}>
          <SectionTitle>{section.title}</SectionTitle>
          <MenuList>
            {section.items
              .filter(item => isVisibleForRole(item.role))
              .map((item, itemIndex) => (
                <MenuItem key={itemIndex}>
                  <NavLink 
                    active={isActive(item.path)}
                    onClick={() => navigate(item.path)}
                  >
                    <IconWrapper>
                      {item.icon}
                    </IconWrapper>
                    {item.label}
                    {item.role && item.role !== 'all' && (
                      <RoleBadge role={item.role}>
                        {getRoleIcon(item.role)}
                        {getRoleText(item.role)}
                      </RoleBadge>
                    )}
                  </NavLink>
                </MenuItem>
              ))}
          </MenuList>
        </MenuSection>
      ))}
    </SidebarContainer>
  );
}

export default Sidebar; 