import React from 'react';
import styled from 'styled-components';
import { ShoppingBag, Bot, TrendingUp } from 'lucide-react';

const HeaderContainer = styled.header`
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #3b82f6;
`;

const LogoIcon = styled.div`
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-weight: 500;
  
  &:hover {
    color: #3b82f6;
  }
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 0.5rem;
  color: #0369a1;
  font-size: 0.875rem;
  font-weight: 500;
`;

const StatusDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background: #10b981;
  border-radius: 50%;
`;

function Header() {
  return (
    <HeaderContainer>
      <Logo>
        <LogoIcon>
          <ShoppingBag size={20} />
        </LogoIcon>
        ShopWise
      </Logo>
      
      <Nav>
        <NavItem>
          <Bot size={16} />
          Gemini AI
        </NavItem>
        <NavItem>
          <TrendingUp size={16} />
          Akıllı Asistan
        </NavItem>
        <StatusIndicator>
          <StatusDot />
          Sistem Aktif
        </StatusIndicator>
      </Nav>
    </HeaderContainer>
  );
}

export default Header; 