import React, { useState } from 'react';
import styled from 'styled-components';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { useMutation } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const ChatbotContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const ChatHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 1.125rem;
`;

const ChatContainer = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 600px;
  display: flex;
  flex-direction: column;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Message = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  max-width: 80%;
  ${props => props.isUser ? 'margin-left: auto;' : 'margin-right: auto;'}
`;

const MessageBubble = styled.div`
  padding: 1.25rem;
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
      max-width: 70%;
    ` 
    : `
      background: linear-gradient(135deg, #f8fafc, #f1f5f9);
      color: #1e293b;
      border-bottom-left-radius: 0.5rem;
      border-left: 4px solid #10b981;
      max-width: 70%;
    `
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const GeminiBadge = styled.div`
  position: absolute;
  top: -8px;
  left: 12px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }
`;

const Avatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  flex-shrink: 0;
  ${props => props.isUser 
    ? 'background: #3b82f6;' 
    : 'background: #10b981;'
  }
`;

const InputContainer = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  font-size: 1rem;
  outline: none;
  
  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const SendButton = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: #3b82f6;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #2563eb;
  }
  
  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
  }
`;

const SuggestionsContainer = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
`;

const SuggestionsTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 0.75rem;
`;

const SuggestionsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SuggestionButton = styled.button`
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
  }
`;

const WelcomeMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #64748b;
`;

const WelcomeIcon = styled.div`
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
`;

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Merhaba! Ben ShopWise asistanınız. Size nasıl yardımcı olabilirim?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [suggestions] = useState([
    "500 TL altında spor ayakkabı öner",
    "En popüler ürünler neler?",
    "Kampanyalar hakkında bilgi ver",
    "Teslimat süreleri nedir?"
  ]);

  const sendMessageMutation = useMutation(
    async (message) => {
      const response = await axios.post('/api/v1/chatbot/chat', {
        message,
        context: messages.map(m => `${m.isUser ? 'User' : 'Assistant'}: ${m.text}`).join('\n')
      });
      return response.data;
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
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <ChatbotContainer>
      <ChatHeader>
        <Title>Gemini ChatBot</Title>
        <Subtitle>Yapay zeka destekli akıllı asistan ile konuşun</Subtitle>
      </ChatHeader>

      <ChatContainer>
        <MessagesContainer>
          {messages.length === 1 ? (
            <WelcomeMessage>
              <WelcomeIcon>
                <Bot size={32} />
              </WelcomeIcon>
              <h3>ShopWise Asistanına Hoş Geldiniz!</h3>
              <p>Ürün arama, öneriler ve destek için sorularınızı sorabilirsiniz.</p>
            </WelcomeMessage>
          ) : (
            messages.map((message) => (
              <Message key={message.id} isUser={message.isUser}>
                <Avatar isUser={message.isUser}>
                  {message.isUser ? <User size={16} /> : <Bot size={16} />}
                </Avatar>
                <MessageBubble isUser={message.isUser}>
                  {!message.isUser && (
                    <GeminiBadge>
                      <Sparkles size={12} />
                      Gemini AI
                    </GeminiBadge>
                  )}
                  {message.text}
                </MessageBubble>
              </Message>
            ))
          )}
          
          {sendMessageMutation.isLoading && (
            <Message isUser={false}>
              <Avatar isUser={false}>
                <Bot size={16} />
              </Avatar>
              <MessageBubble isUser={false}>
                <Sparkles size={16} style={{ animation: 'spin 1s linear infinite' }} />
                Düşünüyor...
              </MessageBubble>
            </Message>
          )}
        </MessagesContainer>

        <SuggestionsContainer>
          <SuggestionsTitle>Hızlı Öneriler</SuggestionsTitle>
          <SuggestionsGrid>
            {suggestions.map((suggestion, index) => (
              <SuggestionButton
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
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
            placeholder="Mesajınızı yazın..."
            disabled={sendMessageMutation.isLoading}
          />
          <SendButton
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || sendMessageMutation.isLoading}
          >
            <Send size={16} />
          </SendButton>
        </InputContainer>
      </ChatContainer>
    </ChatbotContainer>
  );
}

export default Chatbot; 