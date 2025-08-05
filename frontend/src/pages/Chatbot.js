import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Send, Bot, User, Sparkles, Brain, Clock, ShoppingBag, Star, TrendingUp } from 'lucide-react';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import { getMockResponse } from '../utils/geminiMock';
import { sampleProducts } from '../data/products';

const ChatbotContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
`;

const ChatHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #1e293b, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 1.125rem;
  margin-bottom: 2rem;
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
`;

const typing = keyframes`
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const SystemStatus = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  animation: ${css`${pulse} 2s infinite`};
`;

const ChatContainer = styled.div`
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 700px;
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e8f0;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
`;

const Message = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  max-width: 85%;
  animation: slideIn 0.3s ease-out;
  
  ${props => props.isUser ? 'margin-left: auto;' : 'margin-right: auto;'}
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Avatar = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  
  ${props => props.isUser 
    ? `
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      &:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
      }
    ` 
    : `
      background: linear-gradient(135deg, #10b981, #059669);
      &:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3);
      }
    `
  }
`;

const MessageBubble = styled.div`
  padding: 1.5rem;
  border-radius: 1.5rem;
  max-width: 100%;
  word-wrap: break-word;
  position: relative;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  ${props => props.isUser 
    ? `
      background: linear-gradient(135deg, #3b82f6, #2563eb);
      color: white;
      border-bottom-right-radius: 0.5rem;
      margin-left: auto;
      max-width: 75%;
    ` 
    : `
      background: white;
      color: #1e293b;
      border-bottom-left-radius: 0.5rem;
      border-left: 4px solid #10b981;
      max-width: 75%;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    `
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.15);
  }
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  opacity: 0.8;
`;

const MessageTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
`;

const GeminiBadge = styled.div`
  position: absolute;
  top: -8px;
  left: 12px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
  animation: ${css`${pulse} 2s infinite`};
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-style: italic;
  padding: 1rem;
  background: white;
  border-radius: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const TypingDots = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const TypingDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #94a3b8;
  animation: ${css`${typing} 1.4s infinite`};
  
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

const InputContainer = styled.div`
  padding: 2rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  gap: 1rem;
  align-items: center;
  background: white;
`;

const Input = styled.input`
  flex: 1;
  padding: 1rem 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 1rem;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  
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
  width: 3.5rem;
  height: 3.5rem;
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
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const SuggestionsContainer = styled.div`
  padding: 1.5rem 2rem;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
`;

const SuggestionsTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SuggestionsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const SuggestionButton = styled.button`
  padding: 0.75rem 1.25rem;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 1rem;
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  &:hover {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const WelcomeMessage = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: #64748b;
  background: white;
  border-radius: 1.5rem;
  margin: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const WelcomeIcon = styled.div`
  width: 5rem;
  height: 5rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
  animation: ${css`${float} 3s ease-in-out infinite`};
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1rem;
  margin: 0.5rem 0;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ProductName = styled.div`
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
`;

const ProductPrice = styled.div`
  color: #3b82f6;
  font-weight: 700;
  font-size: 1.125rem;
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #f59e0b;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const SpinningSparkles = styled(Sparkles)`
  animation: ${css`${spin} 1s linear infinite`};
`;

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Merhaba! Ben ShopWise AI asistanınız. Size nasıl yardımcı olabilirim? Ürün arama, öneriler veya herhangi bir sorunuz için buradayım! 🤖✨",
      isUser: false,
      timestamp: new Date(),
      isWelcome: true
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  const [suggestions] = useState([
    "500 TL altında spor ayakkabı öner",
    "En popüler ürünler neler?",
    "Kampanyalar hakkında bilgi ver",
    "Teslimat süreleri nedir?",
    "iPhone modellerini karşılaştır",
    "En iyi laptop önerileri"
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
        toast.error('Mesaj gönderilemedi. Lütfen tekrar deneyin.');
        console.error('Chat error:', error);
        setIsTyping(false);
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
    sendMessageMutation.mutate(inputValue);
    setInputValue('');
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    // Auto-send suggestion
    const userMessage = {
      id: Date.now(),
      text: suggestion,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    sendMessageMutation.mutate(suggestion);
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

  return (
    <ChatbotContainer>
      <ChatHeader>
        <Title>
          <Brain size={32} />
          ShopWise AI Asistanı
          <SystemStatus>
            <Sparkles size={16} />
            Sistem Aktif
          </SystemStatus>
        </Title>
        <Subtitle>
          Yapay zeka destekli akıllı asistan ile ürün arama, öneriler ve destek
        </Subtitle>
      </ChatHeader>

      <ChatContainer>
        <MessagesContainer>
          {messages.length === 1 ? (
            <WelcomeMessage>
              <WelcomeIcon>
                <Bot size={32} />
              </WelcomeIcon>
              <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>
                ShopWise AI Asistanına Hoş Geldiniz! 🤖
              </h3>
              <p style={{ lineHeight: '1.6' }}>
                Size en iyi ürün önerilerini sunmak, sorularınızı yanıtlamak ve 
                alışveriş deneyiminizi kişiselleştirmek için buradayım. 
                Hızlı önerilerden birini seçin veya kendi sorunuzu yazın!
              </p>
            </WelcomeMessage>
          ) : (
            messages.map((message) => (
              <Message key={message.id} isUser={message.isUser}>
                <Avatar isUser={message.isUser}>
                  {message.isUser ? <User size={18} /> : <Bot size={18} />}
                </Avatar>
                <MessageBubble isUser={message.isUser}>
                  {!message.isUser && !message.isWelcome && (
                    <GeminiBadge>
                      <Sparkles size={12} />
                      AI
                    </GeminiBadge>
                  )}
                  <MessageHeader>
                    <span>{message.isUser ? 'Siz' : 'ShopWise AI'}</span>
                    <MessageTime>
                      <Clock size={12} />
                      {formatTime(message.timestamp)}
                    </MessageTime>
                  </MessageHeader>
                  <div style={{ whiteSpace: 'pre-line' }}>
                    {message.text}
                  </div>
                </MessageBubble>
              </Message>
            ))
          )}
          
          {isTyping && (
            <Message isUser={false}>
              <Avatar isUser={false}>
                <Bot size={18} />
              </Avatar>
              <MessageBubble isUser={false}>
                <TypingIndicator>
                  <SpinningSparkles size={16} />
                  Yazıyor...
                  <TypingDots>
                    <TypingDot />
                    <TypingDot />
                    <TypingDot />
                  </TypingDots>
                </TypingIndicator>
              </MessageBubble>
            </Message>
          )}
          
          <div ref={messagesEndRef} />
        </MessagesContainer>

        <SuggestionsContainer>
          <SuggestionsTitle>
            <TrendingUp size={16} />
            Hızlı Öneriler
          </SuggestionsTitle>
          <SuggestionsGrid>
            {suggestions.map((suggestion, index) => (
              <SuggestionButton
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                disabled={sendMessageMutation.isLoading || isTyping}
              >
                {suggestion}
              </SuggestionButton>
            ))}
          </SuggestionsGrid>
        </SuggestionsContainer>

        <InputContainer>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Mesajınızı yazın... (Enter ile gönderin)"
            disabled={sendMessageMutation.isLoading || isTyping}
          />
          <SendButton
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || sendMessageMutation.isLoading || isTyping}
          >
            <Send size={18} />
          </SendButton>
        </InputContainer>
      </ChatContainer>
    </ChatbotContainer>
  );
}

export default Chatbot; 