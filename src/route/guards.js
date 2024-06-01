import { protectAuth } from 'src/features/auth/guards/auth.guard';
import { protectGuest } from 'src/features/auth/guards/guest.guard';

export const guards = [protectAuth, protectGuest];
