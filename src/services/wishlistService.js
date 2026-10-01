const CURRENT_USER_KEY = 'storefrontUser';
const LEGACY_WISHLIST_KEY = 'wishlist';
const GUEST_WISHLIST_KEY = 'nook:wishlist:guest';

const readStoredWishlist = (key) => {
  try {
    const wishlist = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(wishlist) ? wishlist : [];
  } catch {
    return [];
  }
};

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || 'null');
  } catch {
    return null;
  }
};

const getWishlistKey = (user = getStoredUser()) => {
  if (!user) return GUEST_WISHLIST_KEY;
  const identity = user.id ?? user.email?.toLowerCase();
  return identity ? `nook:wishlist:user:${encodeURIComponent(identity)}` : GUEST_WISHLIST_KEY;
};

const migrateLegacyWishlist = (user = getStoredUser()) => {
  const legacyWishlist = readStoredWishlist(LEGACY_WISHLIST_KEY);
  if (!localStorage.getItem(LEGACY_WISHLIST_KEY)) return;

  const key = getWishlistKey(user);
  const existingWishlist = readStoredWishlist(key);
  localStorage.setItem(key, JSON.stringify([...new Set([...existingWishlist, ...legacyWishlist])]));
  localStorage.removeItem(LEGACY_WISHLIST_KEY);
};

export const getWishlist = () => {
  migrateLegacyWishlist();
  return readStoredWishlist(getWishlistKey());
};

export const toggleWishlistProduct = (productId) => {
  const key = getWishlistKey();
  const wishlist = getWishlist();
  const updatedWishlist = wishlist.includes(productId)
    ? wishlist.filter((id) => id !== productId)
    : [...wishlist, productId];
  localStorage.setItem(key, JSON.stringify(updatedWishlist));
  return updatedWishlist;
};

export const moveGuestWishlistToUser = (user) => {
  migrateLegacyWishlist(user);
  const guestWishlist = readStoredWishlist(GUEST_WISHLIST_KEY);
  if (!user || guestWishlist.length === 0) return;

  const userKey = getWishlistKey(user);
  const userWishlist = readStoredWishlist(userKey);
  localStorage.setItem(userKey, JSON.stringify([...new Set([...userWishlist, ...guestWishlist])]));
  localStorage.removeItem(GUEST_WISHLIST_KEY);
};
