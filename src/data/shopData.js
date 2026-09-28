export const DEMO_USER = {
  name: "Dina Mohamed",
  email: "dina@example.com",
  phone: "+20 101 234 5678",
  password: "demo1234",
  address: "Cairo, Egypt",
};

export const PRODUCTS = [
  { id: 1, name: "Everyday Leather Tote", category: "Bags", price: 1890, oldPrice: 2250, rating: 4.8, tag: "BESTSELLER", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85" },
  { id: 2, name: "The Classic Watch", category: "Accessories", price: 2450, oldPrice: null, rating: 4.9, tag: "NEW ARRIVAL", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=85" },
  { id: 3, name: "Wireless Headphones", category: "Tech", price: 1299, oldPrice: 1599, rating: 4.7, tag: "19% OFF", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85" },
  { id: 4, name: "Everyday Sneakers", category: "Style", price: 1750, oldPrice: null, rating: 4.6, tag: "OUR PICK", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85" },
  { id: 5, name: "Sculpted Sunglasses", category: "Accessories", price: 980, oldPrice: null, rating: 4.5, tag: "NEW ARRIVAL", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85" },
  { id: 6, name: "Mini Shoulder Bag", category: "Bags", price: 1420, oldPrice: 1690, rating: 4.7, tag: "LIMITED", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85" },
];

export const DEMO_ORDERS = [
  { id: "NM-1048", date: "September 18, 2026", status: "Delivered", amount: 3189, items: "Everyday Leather Tote, Sculpted Sunglasses" },
  { id: "NM-0982", date: "September 2, 2026", status: "Delivered", amount: 2450, items: "The Classic Watch" },
  { id: "NM-0911", date: "August 14, 2026", status: "Delivered", amount: 1299, items: "Wireless Headphones" },
];

const USERS_KEY = "noma_users";
const SESSION_KEY = "noma_session";
const LEGACY_DEMO_EMAIL = "sara@example.com";

function migrateDemoAccount() {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY));
    if (Array.isArray(users)) {
      const migratedUsers = users.map((user) =>
        user.email?.toLowerCase() === LEGACY_DEMO_EMAIL ? { ...user, ...DEMO_USER } : user
      );
      if (migratedUsers.some((user) => user.email === DEMO_USER.email)) {
        localStorage.setItem(USERS_KEY, JSON.stringify(migratedUsers));
      }
    }

    const session = JSON.parse(localStorage.getItem(SESSION_KEY));
    if (session?.email?.toLowerCase() === LEGACY_DEMO_EMAIL) {
      const { password, ...sessionUser } = DEMO_USER;
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    }

    const oldWishlistKey = `noma_wishlist_${LEGACY_DEMO_EMAIL}`;
    const newWishlistKey = `noma_wishlist_${DEMO_USER.email}`;
    const oldWishlist = localStorage.getItem(oldWishlistKey);
    if (oldWishlist && !localStorage.getItem(newWishlistKey)) {
      localStorage.setItem(newWishlistKey, oldWishlist);
      localStorage.removeItem(oldWishlistKey);
    }
  } catch {
    return;
  }
}

export function getUsers() {
  migrateDemoAccount();
  try {
    const stored = JSON.parse(localStorage.getItem(USERS_KEY));
    const otherUsers = (Array.isArray(stored) ? stored : []).filter(
      (user) => ![DEMO_USER.email, LEGACY_DEMO_EMAIL].includes(user.email?.toLowerCase())
    );
    const users = [DEMO_USER, ...otherUsers];
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return users;
  } catch {
    return [DEMO_USER];
  }
}

export function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function readSession() {
  migrateDemoAccount();
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

export function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function readWishlist(email) {
  if (!email) return [];
  try {
    const saved = JSON.parse(localStorage.getItem(`noma_wishlist_${email.toLowerCase()}`));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export function saveWishlist(email, productIds) {
  localStorage.setItem(`noma_wishlist_${email.toLowerCase()}`, JSON.stringify(productIds));
}