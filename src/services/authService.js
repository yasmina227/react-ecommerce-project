import axios from 'axios';
import { moveGuestWishlistToUser } from './wishlistService';

const USERS_KEY = 'storefrontUsers';
const CURRENT_USER_KEY = 'storefrontUser';
const API_URL = 'https://dummyjson.com';

const readUsers = () => JSON.parse(localStorage.getItem(USERS_KEY) || '[]');

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || 'null');
  } catch {
    return null;
  }
};

const startSession = (user) => {
  const profile = {
    id: user.id,
    firstName: user.firstName || user.name?.split(' ')[0] || '',
    lastName: user.lastName || user.name?.split(' ').slice(1).join(' ') || '',
    email: user.email,
    phone: user.phone || '',
    image: user.image || '',
    address: user.address?.address || user.address || '',
    city: user.address?.city || user.city || '',
  };
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(profile));
  moveGuestWishlistToUser(profile);
  sessionStorage.setItem('guestCustomer', JSON.stringify({
    fullName: `${profile.firstName} ${profile.lastName}`.trim(),
    name: `${profile.firstName} ${profile.lastName}`.trim(),
    email: profile.email,
    phone: profile.phone,
    address: profile.address,
    city: profile.city,
  }));
  return profile;
};

export const loginUser = async (identifier, password) => {
  const localUser = readUsers().find(
    (user) => user.email.toLowerCase() === identifier.toLowerCase() && user.password === password
  );

  if (localUser) return startSession(localUser);

  const { data } = await axios.post(`${API_URL}/auth/login`, {
    username: identifier,
    password,
    expiresInMins: 30,
  });
  return startSession(data);
};

export const registerUser = async (details) => {
  const users = readUsers();
  if (users.some((user) => user.email.toLowerCase() === details.email.toLowerCase())) {
    throw new Error('An account with this email already exists.');
  }

  let apiUser = {};
  try {
    const { data } = await axios.post(`${API_URL}/users/add`, {
      firstName: details.firstName,
      lastName: details.lastName,
      email: details.email,
      phone: details.phone,
    });
    apiUser = data;
  } catch {
    // The local prototype account still works when the demo API is unavailable.
  }

  const user = { ...details, id: apiUser.id || Date.now() };
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
  return startSession(user);
};

export const updateCurrentUser = (updates) => {
  const currentUser = getCurrentUser();
  const user = { ...currentUser, ...updates };
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  const users = readUsers().map((registeredUser) => (
    registeredUser.id === currentUser?.id ? { ...registeredUser, ...updates } : registeredUser
  ));
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  sessionStorage.setItem('guestCustomer', JSON.stringify({
    fullName: `${user.firstName} ${user.lastName}`.trim(),
    name: `${user.firstName} ${user.lastName}`.trim(),
    email: user.email,
    phone: user.phone,
    address: user.address,
    city: user.city,
  }));
  return user;
};

export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
  sessionStorage.removeItem('guestCustomer');
};