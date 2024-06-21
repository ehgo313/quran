export const collectionRoutes = [
  {
    path: '/collection/:id',
    name: 'collection.detail',
    meta: {
      requireAuth: true,
      layout: 'LayoutApp',
    },
    component: () => import('./pages/collection-detail-page.vue'),
  },
];
