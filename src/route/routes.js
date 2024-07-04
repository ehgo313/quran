import { authRoutes } from 'src/features/auth/auth.routes';
import { collectionRoutes } from 'src/features/collection/collection.routes';
import { activityRoutes } from 'src/features/activity/activity.routes';
import { statsRoutes } from 'src/features/stats/stats.routes';
import { profileRoutes } from 'src/features/profile/profile.routes';

export const routes = [
  ...activityRoutes,
  ...authRoutes,
  ...collectionRoutes,
  ...statsRoutes,
  ...profileRoutes,
];
