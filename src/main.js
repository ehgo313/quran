import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { useRouter } from './core/router/router';
import { routes } from './route/routes';
import { useEmitter } from './core/emitter/emitter';

const app = createApp(App);

useRouter(app, {
  routes,
});
useEmitter(app);

app.mount('#app');
