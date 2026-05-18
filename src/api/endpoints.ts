export const endpoints = {
  users: {
    getAll: '/users',
    getById: (id: number) => `/users/${id}`,
  },
  auth: {
    login: '/auth/login',
    me: '/auth/me',
    refresh: '/auth/refresh',
  },
};