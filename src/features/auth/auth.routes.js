export const authRoutes = [
  {
    path: '/login',
    name: 'auth.login',
    meta: {
      requireGuest: true,
    },
    component: () => import('./pages/auth-login-page.vue'),
  },
  {
    path: '/login/github',
    name: 'auth.login-github-callback',
    meta: {
      requireGuest: true,
    },
    component: () => import('./pages/auth-login-github-callback-page.vue'),
  },
];
