import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Chatbot from './pages/Chatbot';
import Products from './pages/Products';
import Reviews from './pages/Reviews';
import Addresses from './pages/Addresses';
import Search from './pages/Search';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
`;

const ContentArea = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: #f8fafc;
`;

function App() {
  return (
    <AppContainer>
      <Header />
      <MainContent>
        <Sidebar />
        <ContentArea>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/products" element={<Products />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/addresses" element={<Addresses />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </ContentArea>
      </MainContent>
    </AppContainer>
  );
}

export default App; 