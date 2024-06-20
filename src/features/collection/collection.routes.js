export const collectionRoutes = [
  {
    path: '/collection/:id',
    name: 'collection.detail',
    meta: {
      requireAuth: true,
    },
    component: () => import('./pages/collection-detail-page.vue'),
  },
];
