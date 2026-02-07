import { User } from '@core/_models/user/user.model';

/**
 * Represents the server response after a successful authentication process.
 * * @example
 * ```typescript
 * const authData: AuthResponse = {
 * user: currentUser,
 * toutouken: 'v3ry.s3cur3.jwtt0k3n'
 * };
 * ```
 */
export interface AuthResponse {
  /**
   * The authenticated user's profile data.
   * @see {@link User}
   */
  user: User;

  /**
   * The JSON Web Token (JWT) used to authorize subsequent API requests.
   */
  token: string;
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
