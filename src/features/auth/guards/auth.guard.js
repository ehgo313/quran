import { useAuthStore } from 'src/features/auth/auth.store';

export function protectAuth(to) {
  const authStore = useAuthStore();

  if (
    to.matched.some((route) => route.meta.requireAuth) &&
    !authStore.isLoggedIn
  ) {
    return {
      name: 'auth.login',
    };
  }
}
