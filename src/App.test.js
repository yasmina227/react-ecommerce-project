import { getCurrentUser } from './services/authService';
import { getWishlist, toggleWishlistProduct } from './services/wishlistService';

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});

test('reads the signed-in shopper profile from browser storage', () => {
  const profile = { firstName: 'Sam', email: 'sam@example.com' };
  localStorage.setItem('storefrontUser', JSON.stringify(profile));

  expect(getCurrentUser()).toEqual(profile);
});

test('keeps favorites separate for each signed-in user', () => {
  localStorage.setItem('storefrontUser', JSON.stringify({ id: 1, email: 'sam@example.com' }));
  toggleWishlistProduct(42);

  localStorage.setItem('storefrontUser', JSON.stringify({ id: 2, email: 'lee@example.com' }));
  expect(getWishlist()).toEqual([]);

  localStorage.setItem('storefrontUser', JSON.stringify({ id: 1, email: 'sam@example.com' }));
  expect(getWishlist()).toEqual([42]);
});
