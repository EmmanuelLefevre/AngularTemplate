/**
 * Defines the access levels available within the application.
 * - `ADMIN`: Full access to system settings and user management.
 * - `USER`: Standard access to personal data and general features.
 */
export type UserRole = 'ADMIN' | 'USER';

/**
 * Represents the core User entity within the system.
 * This structure is used for profile management and session state.
 */
export interface User {
  /**
   * Unique identifier for the user (Primary Key).
   * @example 42
   */
  id: number;

  /**
   * The display name chosen by the user.
   */
  username: string;

  /**
   * The registered email address used for notifications and login.
   * @example "alex.smith@company.com"
   */
  email: string;

  /**
   * List of permissions assigned to the user.
   * Determines UI visibility and API access.
   * @see {@link UserRole}
   */
  roles: UserRole[];
}
