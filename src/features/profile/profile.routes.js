export const profileRoutes = [
  {
    path: '/profile',
    name: 'profile.edit',
    meta: {
      requireAuth: true,
      layout: 'LayoutApp',
    },
    component: () => import('./pages/profile-edit-page.vue'),
  },
];
