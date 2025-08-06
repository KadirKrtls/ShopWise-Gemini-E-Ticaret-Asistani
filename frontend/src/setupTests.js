// Basic setup for Jest testing
// No complex dependencies for now

// Mock localStorage if needed
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// Only assign if localStorage doesn't exist (like in test environment)
if (typeof Storage === 'undefined') {
  global.localStorage = localStorageMock;
}