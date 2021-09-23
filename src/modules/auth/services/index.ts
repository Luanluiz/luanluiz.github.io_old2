import { AuthService } from './auth.service';
import { UserService } from '@app/services/user.service';

export const services = [AuthService];

export * from './auth.service';
export * from '@app/services/user.service';
