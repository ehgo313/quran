import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { useRouter } from './core/router/router';
import { routes } from './route/routes';
import { useEmitter } from './core/emitter/emitter';
import { useStore } from './core/store/store';
import { guards } from './route/guards';

const app = createApp(App);

useStore(app);
useRouter(app, {
  routes,
  guards,
});
useEmitter(app);

app.mount('#app');
