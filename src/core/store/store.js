import { createPinia } from 'pinia';

export function useStore(app) {
  const store = createPinia();

  app.use(store);
}
