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
  {
    path: '/activities',
    name: 'activity.all',
    meta: {
      requireAuth: true,
      layout: 'LayoutApp',
    },
    component: () => import('./pages/activity-index-page.vue'),
  },
  {
    path: '/activities/late',
    name: 'activity.late',
    meta: {
      requireAuth: true,
      layout: 'LayoutApp',
    },
    component: () => import('./pages/activity-late-page.vue'),
  },
];
