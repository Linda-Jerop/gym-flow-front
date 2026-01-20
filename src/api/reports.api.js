import api from './axios';

export const getSummaryReport = async (params = {}) => {
  const response = await api.get('/reports/summary', { params });
  return response.data;
};

export const getAttendanceReport = async (params = {}) => {
  const response = await api.get('/reports/attendance', { params });
  return response.data;
};

export const getMembershipReport = async (params = {}) => {
  const response = await api.get('/reports/membership', { params });
  return response.data;
};

export const getRevenueReport = async (params = {}) => {
  const response = await api.get('/reports/revenue', { params });
  return response.data;
};

export const exportReport = async (type, format = 'csv') => {
  const response = await api.get(`/reports/export/${type}`, {
    params: { format },
    responseType: 'blob',
  });
  return response.data;
};
