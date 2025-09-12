import {AuthMethod} from './authMethod';
import {Profile} from './profile';

export interface User {
  id: string
  createdAt: string
  profile: Profile
  authMethods: AuthMethod[]
}
