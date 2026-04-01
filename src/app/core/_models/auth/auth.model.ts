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

/**
 * Payload structure required for a new user registration.
 * Extends the base login credentials with profile-specific information.
 */
export interface RegisterCredentials extends LoginCredentials {
  /**
   * The chosen display name for the new account.
   * This is typically stored in the user's metadata for profile display.
   * @example "JonhDoe_42"
   */
  username: string;
}
