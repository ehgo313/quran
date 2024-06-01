export const dashboardRoutes = [
  {
    path: '/',
    name: 'dashboard',
    meta: {
      requireAuth: true,
    },
    component: () => import('./pages/dashboard-page.vue'),
  },
];
