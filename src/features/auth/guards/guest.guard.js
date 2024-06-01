import { useAuthStore } from 'src/features/auth/auth.store';

export function protectGuest(to) {
  const authStore = useAuthStore();

  if (
    to.matched.some((route) => route.meta.requireGuest) &&
    authStore.isLoggedIn
  ) {
    return {
      name: 'dashboard',
    };
  }
}
