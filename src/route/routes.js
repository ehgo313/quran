import { authRoutes } from 'src/features/auth/auth.routes';
import { collectionRoutes } from 'src/features/collection/collection.routes';
import { activityRoutes } from 'src/features/activity/activity.routes';

export const routes = [...activityRoutes, ...authRoutes, ...collectionRoutes];
