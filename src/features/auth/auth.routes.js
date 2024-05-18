export const authRoutes = [
  {
    path: '/',
    name: 'auth.login',
    component: () => import('./pages/auth-login-page.vue'),
  },
];
