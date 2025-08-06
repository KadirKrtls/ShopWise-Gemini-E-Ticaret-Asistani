import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
    error: jest.fn(),
  },
  Toaster: () => null,
}));

// Create a test wrapper with required providers
const TestWrapper = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </BrowserRouter>
  );
};

test('renders ShopWise application', () => {
  render(
    <TestWrapper>
      <App />
    </TestWrapper>
  );
  
  // Check if the app renders without crashing
  expect(document.body).toBeInTheDocument();
});

test('app has main container', () => {
  render(
    <TestWrapper>
      <App />
    </TestWrapper>
  );
  
  // The app should render main content
  const mainContent = document.querySelector('main');
  expect(mainContent).toBeInTheDocument();
});