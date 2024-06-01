export const authRoutes = [
  {
    path: '/login',
    name: 'auth.login',
    meta: {
      requireGuest: true,
    },
    component: () => import('./pages/auth-login-page.vue'),
  },
];
