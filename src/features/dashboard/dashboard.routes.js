export const dashboardRoutes = [
  {
    path: '/',
    name: 'dashboard',
    meta: {
      requireAuth: true,
      layout: 'LayoutApp',
    },
    component: () => import('./pages/dashboard-page.vue'),
  },
];
