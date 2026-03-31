import { User } from '@core/_models/user/user.model';

/**
 * Represents the server response after a successful authentication process.
 * The token is handled natively by the browser via HttpOnly cookie.
 */
export interface AuthResponse {
  /**
   * The authenticated user's profile data.
   * @see {@link User}
   */
  user: User;
}

/**
 * Payload structure required for a login attempt.
 */
export interface LoginCredentials {
  /**
   * The unique email address associated with the user account.
   * @example "dev.pro@example.com"
   */
  email: string;

  /**
   * The plain-text password provided by the user.
   * @notices This should be handled securely and never logged in plain text.
   */
  password: string;
}
