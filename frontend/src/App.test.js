// Basic JavaScript tests without React dependencies

test('basic math operations', () => {
  expect(2 + 2).toBe(4);
  expect(10 - 5).toBe(5);
  expect(3 * 4).toBe(12);
  expect(8 / 2).toBe(4);
});

test('string operations', () => {
  const appName = 'ShopWise';
  expect(appName.length).toBe(8);
  expect(appName.toLowerCase()).toBe('shopwise');
  expect(appName.includes('Shop')).toBe(true);
});

test('array operations', () => {
  const numbers = [1, 2, 3, 4, 5];
  expect(numbers.length).toBe(5);
  expect(numbers[0]).toBe(1);
  expect(numbers[numbers.length - 1]).toBe(5);
});

test('object operations', () => {
  const user = {
    name: 'Test User',
    email: 'test@example.com',
    role: 'customer'
  };
  
  expect(user.name).toBe('Test User');
  expect(user.email).toContain('@');
  expect(Object.keys(user)).toHaveLength(3);
});