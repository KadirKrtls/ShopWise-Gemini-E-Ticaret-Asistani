import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import Chatbot from './pages/Chatbot';
import Products from './pages/Products';
import Reviews from './pages/Reviews';
import Addresses from './pages/Addresses';
import Search from './pages/Search';
import ProductComparison from './pages/ProductComparison';
import PriceTracking from './pages/PriceTracking';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #f8fafc;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

function App() {
  return (
    <AppContainer>
      <Sidebar />
      <MainContent>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/products" element={<Products />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/addresses" element={<Addresses />} />
          <Route path="/search" element={<Search />} />
          <Route path="/comparison" element={<ProductComparison />} />
          <Route path="/price-tracking" element={<PriceTracking />} />
        </Routes>
      </MainContent>
    </AppContainer>
  );
}

export default App; 