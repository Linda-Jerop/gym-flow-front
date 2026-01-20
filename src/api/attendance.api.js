import api from './axios';

export const checkIn = async () => {
  const response = await api.post('/attendance/check-in');
  return response.data;
};

export const checkOut = async () => {
  const response = await api.post('/attendance/check-out');
  return response.data;
};

export const getAttendanceHistory = async (params = {}) => {
  const response = await api.get('/attendance', { params });
  return response.data;
};

export const getTodayAttendance = async () => {
  const response = await api.get('/attendance/today');
  return response.data;
};

export const getAttendanceStats = async (params = {}) => {
  const response = await api.get('/attendance/stats', { params });
  return response.data;
};
