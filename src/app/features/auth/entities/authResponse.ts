import {User} from './user';

export interface AuthResponse {
  authToken: string;
  user: User
}
