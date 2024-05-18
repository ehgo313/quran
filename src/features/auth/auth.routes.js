export const authRoutes = [
  {
    path: '/login',
    name: 'auth.login',
    component: () => import('./pages/auth-login-page.vue'),
  },
];
