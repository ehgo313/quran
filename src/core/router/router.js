import { createRouter, createWebHistory } from 'vue-router';

export function useRouter(app, options) {
  const router = createRouter({
    routes: options.routes,
    history: createWebHistory(),
  });

  options.guards.forEach((guard) => {
    router.beforeEach(guard);
  });

  app.use(router);
}
