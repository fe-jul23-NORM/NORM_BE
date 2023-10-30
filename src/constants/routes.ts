export const PRODUCT_ROUTES = {
  BASE: 'api/products',
  GET_CURRENT: '/:id',
  GET_NEW: '/new',
  GET_DISCOUNT: '/discount',
  GET_RECOMMENDED: '/:id/recommended',
  GET_FAVORITES: '/favorites',
  ADD_TO_FAVORITE: '/add-to-favorite/:id',
  REMOVE_FROM_FAVORITE: 'remove-from-favorite/:id',
};

export const AUTH_ROUTES = {
  DEFAULT: '/api/auth',
  LOGIN: '/login',
  REGISTER: '/register',
  LOGOUT: '/logout',
  REFRESH: '/refresh',
};

export const ORDER_ROUTES = {
  DEFAULT: '/api/order',
  CREATE_BY_USER: '/user-create',
  CREATE_BY_GUEST: '/guest-create',
  GET: '/get',
};
