export type UserRole = 'ADMIN' | 'USER';

export interface User {
  id: number;
  username: string;
  email: string;
  roles: UserRole[];
}
