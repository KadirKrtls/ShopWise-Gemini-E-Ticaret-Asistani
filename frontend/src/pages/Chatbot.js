import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Send, Bot, User, Sparkles, Brain, Clock, ShoppingBag, Star, TrendingUp, MessageCircle, Zap, Shield } from 'lucide-react';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import { getMockResponse } from '../utils/geminiMock';
import { sampleProducts } from '../data/products';

// Keyframes
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

const typing = keyframes`
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-8px); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Main Container
const ChatbotContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
`;

// Header Section
const ChatHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(135deg, #1e293b 0%, #3b82f6 50%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    flex-direction: column;
  }
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const SystemStatus = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  animation: ${css`${pulse} 2s infinite`};
  margin-bottom: 2rem;
`;

// Chat Container
const ChatContainer = styled.div`
  background: white;
  border-radius: 2rem;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 700px;
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e8f0;
  position: relative;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }
`;

// Message Components
const Message = styled.div`
  display: flex;
  gap: 1rem;
  animation: ${css`${slideIn} 0.3s ease-out`};
  
  ${props => props.isUser && `
    flex-direction: row-reverse;
  `}
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
  flex-shrink: 0;
  
  ${props => props.isUser ? `
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
  ` : `
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    animation: ${css`${float} 3s ease-in-out infinite`};
  `}
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 1rem 1.5rem;
  border-radius: 1.5rem;
  position: relative;
  line-height: 1.6;
  
  ${props => props.isUser ? `
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
    border-bottom-right-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  ` : `
    background: linear-gradient(135deg, #f8fafc, #e2e8f0);
    color: #1e293b;
    border: 1px solid #e2e8f0;
    border-bottom-left-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  `}
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  
  ${props => props.isUser ? `
    color: rgba(255, 255, 255, 0.9);
  ` : `
    color: #64748b;
  `}
`;

const MessageTime = styled.span`
  font-size: 0.75rem;
  opacity: 0.8;
`;

const MessageContent = styled.div`
  white-space: pre-line;
  
  strong {
    font-weight: 700;
  }
  
  em {
    font-style: italic;
  }
  
  ul, ol {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
  }
  
  li {
    margin: 0.25rem 0;
  }
`;

// Typing Indicator
const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  border-radius: 1.5rem;
  border-bottom-left-radius: 0.5rem;
  max-width: 70%;
  animation: ${css`${fadeIn} 0.3s ease-out`};
`;

const TypingDots = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const TypingDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #64748b;
  animation: ${css`${typing} 1.4s infinite`};
  
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

// Input Section
const InputContainer = styled.div`
  padding: 1.5rem 2rem;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 1rem 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 2rem;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  background: white;
  
  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &:hover {
    border-color: #cbd5e1;
  }
  
  &::placeholder {
    color: #94a3b8;
  }
`;

const SendButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

// Suggestions Section
const SuggestionsContainer = styled.div`
  padding: 1.5rem 2rem;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
`;

const SuggestionsTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SuggestionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const SuggestionButton = styled.button`
  padding: 0.75rem 1rem;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  
  &:hover {
    border-color: #3b82f6;
    background: #f0f9ff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Welcome Message
const WelcomeMessage = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  border-radius: 1.5rem;
  margin: 2rem;
  border: 1px solid #bae6fd;
`;

const WelcomeIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 2rem;
  animation: ${css`${float} 3s ease-in-out infinite`};
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
`;

const WelcomeTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const WelcomeText = styled.p`
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const WelcomeFeatures = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
  
  svg {
    color: #3b82f6;
  }
`;

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessageMutation = useMutation(
    async (message) => {
      setIsTyping(true);
      
      try {
        // Call real Gemini API
        const response = await fetch('/api/v1/chatbot/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: message,
            context: 'ShopWise e-ticaret asistanı. Kullanıcıya ürün önerileri, kampanyalar ve genel bilgiler ver. Türkçe yanıt ver.'
          })
        });

        if (!response.ok) {
          throw new Error('API yanıt vermedi');
        }

        const data = await response.json();
        let finalResponse = data.response;
        
        // Add product recommendations if relevant
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('ayakkabı') || lowerMessage.includes('spor')) {
          const shoes = sampleProducts.filter(p => p.category === 'Spor Ayakkabı').slice(0, 2);
          if (shoes.length > 0) {
            finalResponse += '\n\n**Önerilen Ürünler:**\n';
            shoes.forEach(shoe => {
              finalResponse += `• ${shoe.name} - ₺${shoe.price} (${shoe.rating}/5 ⭐)\n`;
            });
          }
        }
        
        if (lowerMessage.includes('iphone') || lowerMessage.includes('telefon')) {
          const phones = sampleProducts.filter(p => p.category === 'Telefon').slice(0, 2);
          if (phones.length > 0) {
            finalResponse += '\n\n**Önerilen Telefonlar:**\n';
            phones.forEach(phone => {
              finalResponse += `• ${phone.name} - ₺${phone.price} (${phone.rating}/5 ⭐)\n`;
            });
          }
        }
        
        setIsTyping(false);
        return { response: finalResponse };
        
      } catch (error) {
        console.error('Gemini API Error:', error);
        
        // Fallback to intelligent mock response if API fails
        let response = '';
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('merhaba') || lowerMessage.includes('selam')) {
          response = "Merhaba! Ben ShopWise AI asistanınız. Size nasıl yardımcı olabilirim? Ürün arama, öneriler, kampanyalar veya herhangi bir konuda destek verebilirim. 🤖✨";
        } else if (lowerMessage.includes('ayakkabı') || lowerMessage.includes('spor')) {
          response = "Spor ayakkabı önerileri için size en iyi seçenekleri sunuyorum:\n\n🏃‍♂️ **Koşu için:**\n• Nike Air Zoom Pegasus - Hafif ve esnek\n• Adidas Ultraboost - Maksimum konfor\n• Asics Gel-Kayano - Stabilite odaklı\n\n🏋️‍♂️ **Fitness için:**\n• Nike Metcon - Çok yönlü antrenman\n• Reebok Nano - CrossFit uyumlu\n• Under Armour Tribase - Güçlü taban\n\nHangi aktivite için arıyorsunuz?";
        } else if (lowerMessage.includes('iphone') || lowerMessage.includes('telefon')) {
          response = "iPhone modelleri hakkında detaylı bilgi:\n\n📱 **iPhone 15 Pro:**\n• A17 Pro çip - En güçlü performans\n• 48MP kamera - ProRAW desteği\n• Titanium tasarım - Hafif ve dayanıklı\n• USB-C bağlantı - Hızlı veri transferi\n\n📱 **iPhone 15:**\n• A16 Bionic çip - Mükemmel performans\n• 48MP kamera - Yeni kamera sistemi\n• Alüminyum tasarım - Şık görünüm\n• USB-C bağlantı - Modern teknoloji\n\nHangi özellik sizin için daha önemli?";
        } else if (lowerMessage.includes('kampanya') || lowerMessage.includes('indirim')) {
          response = "🎉 **Güncel Kampanyalar:**\n\n📱 **Telefonlar:**\n• iPhone 15 Pro: %10 indirim + ücretsiz kargo\n• Samsung Galaxy S24: %15 indirim + Galaxy Buds\n• Xiaomi Redmi Note 13: %20 indirim\n\n💻 **Bilgisayarlar:**\n• MacBook Air M2: %8 indirim + Apple Care+\n• Dell XPS 13: %12 indirim + ücretsiz kargo\n• Lenovo ThinkPad: %15 indirim\n\n👟 **Spor Ayakkabı:**\n• Nike Air Max: %25 indirim\n• Adidas Ultraboost: %20 indirim\n• New Balance: %30 indirim\n\nBu kampanyalar sınırlı süre için geçerlidir!";
        } else if (lowerMessage.includes('teslimat') || lowerMessage.includes('kargo')) {
          response = "🚚 **Teslimat Bilgileri:**\n\n📦 **Standart Teslimat:**\n• 2-3 iş günü\n• 15 TL (100 TL üzeri ücretsiz)\n• Tüm Türkiye\n\n⚡ **Hızlı Teslimat:**\n• Aynı gün (İstanbul, Ankara, İzmir)\n• 25 TL (200 TL üzeri ücretsiz)\n• 09:00-18:00 arası\n\n🏪 **Mağazadan Teslim:**\n• 1 saat içinde\n• Ücretsiz\n• Sadece büyük şehirlerde\n\nHangi teslimat seçeneğini tercih edersiniz?";
        } else if (lowerMessage.includes('500') && lowerMessage.includes('tl')) {
          response = "500 TL altında harika seçenekler:\n\n📱 **Telefonlar:**\n• Xiaomi Redmi 9A - 450 TL\n• Samsung Galaxy A02s - 480 TL\n• Nokia G10 - 420 TL\n\n👟 **Spor Ayakkabı:**\n• Nike Revolution - 380 TL\n• Adidas Cloudfoam - 420 TL\n• Puma Softride - 350 TL\n\n💻 **Aksesuarlar:**\n• Bluetooth kulaklık - 150 TL\n• Powerbank 10000mAh - 200 TL\n• Telefon kılıfı - 80 TL\n\nBu ürünler kaliteli ve bütçe dostu!";
        } else if (lowerMessage.includes('laptop') || lowerMessage.includes('bilgisayar')) {
          response = "💻 **Laptop Önerileri:**\n\n🎯 **Gaming:**\n• ASUS ROG Strix - RTX 4060, 16GB RAM\n• MSI Katana - RTX 4050, 8GB RAM\n• Lenovo Legion - RTX 4070, 32GB RAM\n\n💼 **İş/Ofis:**\n• MacBook Air M2 - Hafif ve güçlü\n• Dell XPS 13 - Premium tasarım\n• Lenovo ThinkPad - Dayanıklı\n\n🎨 **Tasarım:**\n• MacBook Pro M3 - Maksimum performans\n• ASUS ProArt - Renk kalibrasyonu\n• HP ZBook - Workstation\n\nHangi kullanım amacı için arıyorsunuz?";
        } else {
          response = "Merhaba! Ben ShopWise AI asistanınız. Size nasıl yardımcı olabilirim?\n\n🔍 **Arama yapabilirim:**\n• Ürün önerileri\n• Fiyat karşılaştırması\n• Kampanya bilgileri\n\n💡 **Önerilerim:**\n• \"500 TL altında telefon öner\"\n• \"Spor ayakkabı kampanyaları\"\n• \"En iyi laptop modelleri\"\n• \"Teslimat süreleri\"\n\nNe konuda yardım istiyorsunuz?";
        }
        
        // Add product recommendations if relevant
        if (lowerMessage.includes('ayakkabı') || lowerMessage.includes('spor')) {
          const shoes = sampleProducts.filter(p => p.category === 'Spor Ayakkabı').slice(0, 2);
          if (shoes.length > 0) {
            response += '\n\n**Önerilen Ürünler:**\n';
            shoes.forEach(shoe => {
              response += `• ${shoe.name} - ₺${shoe.price} (${shoe.rating}/5 ⭐)\n`;
            });
          }
        }
        
        if (lowerMessage.includes('iphone') || lowerMessage.includes('telefon')) {
          const phones = sampleProducts.filter(p => p.category === 'Telefon').slice(0, 2);
          if (phones.length > 0) {
            response += '\n\n**Önerilen Telefonlar:**\n';
            phones.forEach(phone => {
              response += `• ${phone.name} - ₺${phone.price} (${phone.rating}/5 ⭐)\n`;
            });
          }
        }
        
        setIsTyping(false);
        return { response };
      }
    },
    {
      onSuccess: (data) => {
        const newMessage = {
          id: Date.now(),
          text: data.response,
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, newMessage]);
      },
      onError: (error) => {
        console.error('Message send error:', error);
        toast.error('Mesaj gönderilemedi. Lütfen tekrar deneyin.');
      }
    }
  );

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    sendMessageMutation.mutate(inputValue);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    handleSendMessage();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const suggestions = [
    "500 TL altında spor ayakkabı öner",
    "En popüler ürünler neler?",
    "Kampanyalar hakkında bilgi ver",
    "Teslimat süreleri nedir?",
    "iPhone 15 hakkında bilgi ver",
    "Laptop önerileri al"
  ];

  return (
    <ChatbotContainer>
      <ChatHeader>
        <Title>
          <Sparkles />
          ShopWise AI Asistanı
          <Brain />
        </Title>
        <Subtitle>
          <MessageCircle />
          Gemini destekli akıllı e-ticaret asistanınız
        </Subtitle>
        <SystemStatus>
          <Zap />
          Sistem Aktif
        </SystemStatus>
      </ChatHeader>

      <ChatContainer>
        <MessagesContainer>
          {messages.length === 0 && (
            <WelcomeMessage>
              <WelcomeIcon>
                <Bot />
              </WelcomeIcon>
              <WelcomeTitle>Hoş Geldiniz! 👋</WelcomeTitle>
              <WelcomeText>
                Ben ShopWise AI asistanınız. Size ürün önerileri, kampanya bilgileri ve 
                her türlü e-ticaret konusunda yardımcı olabilirim. Aşağıdaki önerilerden 
                birini seçebilir veya kendi sorunuzu yazabilirsiniz.
              </WelcomeText>
              <WelcomeFeatures>
                <FeatureItem>
                  <Shield />
                  Güvenli Alışveriş
                </FeatureItem>
                <FeatureItem>
                  <Star />
                  En İyi Fiyatlar
                </FeatureItem>
                <FeatureItem>
                  <ShoppingBag />
                  Hızlı Teslimat
                </FeatureItem>
              </WelcomeFeatures>
            </WelcomeMessage>
          )}

          {messages.map((message) => (
            <Message key={message.id} isUser={message.isUser}>
              <Avatar isUser={message.isUser}>
                {message.isUser ? <User size={20} /> : <Bot size={20} />}
              </Avatar>
              <MessageBubble isUser={message.isUser}>
                <MessageHeader isUser={message.isUser}>
                  {message.isUser ? 'Siz' : 'Gemini AI'}
                  <MessageTime>{formatTime(message.timestamp)}</MessageTime>
                </MessageHeader>
                <MessageContent>{message.text}</MessageContent>
              </MessageBubble>
            </Message>
          ))}

          {isTyping && (
            <Message isUser={false}>
              <Avatar isUser={false}>
                <Bot size={20} />
              </Avatar>
              <TypingIndicator>
                <MessageHeader isUser={false}>
                  Gemini AI
                  <MessageTime>yazıyor...</MessageTime>
                </MessageHeader>
                <TypingDots>
                  <TypingDot />
                  <TypingDot />
                  <TypingDot />
                </TypingDots>
              </TypingIndicator>
            </Message>
          )}

          <div ref={messagesEndRef} />
        </MessagesContainer>

        <InputContainer>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Mesajınızı yazın..."
            disabled={isTyping}
          />
          <SendButton
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
          >
            <Send size={20} />
          </SendButton>
        </InputContainer>

        <SuggestionsContainer>
          <SuggestionsTitle>
            <TrendingUp />
            Hızlı Öneriler
          </SuggestionsTitle>
          <SuggestionsGrid>
            {suggestions.map((suggestion, index) => (
              <SuggestionButton
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                disabled={isTyping}
              >
                {suggestion}
              </SuggestionButton>
            ))}
          </SuggestionsGrid>
        </SuggestionsContainer>
      </ChatContainer>
    </ChatbotContainer>
  );
}

export default Chatbot; 