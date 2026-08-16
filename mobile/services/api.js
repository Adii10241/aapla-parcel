import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://10.151.189.136:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  sendOtp: (phone) => api.post('/auth/send-otp', { phone }),
  verifyOtp: (phone, otp, name) => api.post('/auth/verify-otp', { phone, otp, name }),
};

export const tripAPI = {
  createTrip: (data) => api.post('/trips', data),
  getMyTrips: () => api.get('/trips/my'),
  getAvailableTrips: (source, destination) => api.get('/trips/available', { params: { source, destination } }),
  getTripById: (id) => api.get(`/trips/${id}`),
  updateTripStatus: (id, status) => api.patch(`/trips/${id}/status`, { status }),
};

export const parcelAPI = {
  createParcel: (data) => api.post('/parcels', data),
  getMyParcels: () => api.get('/parcels/my'),
  getParcelById: (id) => api.get(`/parcels/${id}`),
  updateParcelStatus: (id, status) => api.patch(`/parcels/${id}/status`, { status }),
  generatePickupOtp: (id) => api.post(`/parcels/${id}/pickup-otp`),
  verifyPickupOtp: (id, otp) => api.post(`/parcels/${id}/verify-pickup`, { otp }),
  generateDeliveryOtp: (id) => api.post(`/parcels/${id}/delivery-otp`),
  verifyDeliveryOtp: (id, otp) => api.post(`/parcels/${id}/verify-delivery`, { otp }),
};

export const requestAPI = {
  createRequest: (parcelId, tripId) => api.post('/requests', { parcelId, tripId }),
  getMyRequests: () => api.get('/requests/my'),
  getRequestsForMyParcels: () => api.get('/requests/parcels'),
  respondToRequest: (id, status) => api.patch(`/requests/${id}/respond`, { status }),
};

export const chatAPI = {
  createChat: (participantId) => api.post('/chats', { participantId }),
  getMyChats: () => api.get('/chats/my'),
  sendMessage: (chatId, message) => api.post('/chats/messages', { chatId, message }),
  getMessages: (chatId) => api.get(`/chats/messages/${chatId}`),
};

export const ratingAPI = {
  createRating: (toUserId, tripId, stars, review) => api.post('/ratings', { toUserId, tripId, stars, review }),
  getUserRatings: (userId) => api.get(`/ratings/user/${userId}`),
};

export default api;
