import { User } from '@core/_models/user/user.model';

/**
 * Response contract after a successful connection
 */
export interface AuthResponse {
  user: User;
  token: string;
}

/**
 * Data structure for connection attempt
 */
export interface LoginCredentials {
  email: string;
  password: string;
}
