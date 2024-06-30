export const statsRoutes = [
  {
    path: '/stats',
    name: 'stats.index',
    meta: {
      requireAuth: true,
      layout: 'LayoutApp',
    },
    component: () => import('./pages/stats-index-page.vue'),
  },
];
