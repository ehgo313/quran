import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { useRouter } from './core/router/router';
import { routes } from './route/routes';

const app = createApp(App);

useRouter(app, {
  routes,
});

app.mount('#app');
