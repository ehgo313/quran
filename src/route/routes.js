import { authRoutes } from '../features/auth/auth.routes';
import { collectionRoutes } from '../features/collection/collection.routes';
import { dashboardRoutes } from '../features/dashboard/dashboard.routes';

export const routes = [...dashboardRoutes, ...authRoutes, ...collectionRoutes];
