import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { useRouter } from './core/router/router';
import { routes } from './route/routes';
import { useEmitter } from './core/emitter/emitter';
import { useStore } from './core/store/store';
import { guards } from './route/guards';
import { useClickOutside } from './plugins/click-outside';
import { useLayout } from './plugins/layout';
import { useGoogleLogin } from './plugins/google-login';

const app = createApp(App);

useStore(app);
useRouter(app, {
  routes,
  guards,
});
useEmitter(app);
useClickOutside(app);
useLayout(app);
useGoogleLogin(app);

app.mount('#app');
