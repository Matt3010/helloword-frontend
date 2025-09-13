import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  public get accessToken(): string | null {
    return localStorage.getItem("authToken");
  }

  public set accessToken(token: string) {
    localStorage.setItem("authToken", token);
    if(token === '') {
      localStorage.removeItem("authToken");
    }
  }

  public hasToken(): boolean {
    return this.accessToken !== null && this.accessToken !== '';
  }

}
