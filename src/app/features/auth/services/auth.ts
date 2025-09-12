import { Injectable } from '@angular/core';
import {User} from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  public saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

}
