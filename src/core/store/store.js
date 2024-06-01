import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

export function useStore(app) {
  const store = createPinia();

  store.use(piniaPluginPersistedstate);

  app.use(store);
}
