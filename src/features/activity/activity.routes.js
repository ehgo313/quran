export const activityRoutes = [
  {
    path: '/',
    name: 'activity.today',
    meta: {
      requireAuth: true,
      layout: 'LayoutApp',
    },
    component: () => import('./pages/activity-today-page.vue'),
  },
];
