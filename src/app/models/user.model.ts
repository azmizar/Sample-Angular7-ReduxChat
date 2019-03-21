/**
 * User model (lightweight model)
 */
export interface User {
  id: string;
  name: string;
  avatarSrc: string;
  isClient?: boolean;
}
