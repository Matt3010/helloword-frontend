import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Token {

  public get accessToken(): string | null {
    return localStorage.getItem("authToken");
  }

  public set accessToken(token: string) {
    localStorage.setItem("authToken", token);
  }

  public hasToken(): boolean {
    return this.accessToken !== null && this.accessToken !== '';
  }

  public clearToken(): void {
    localStorage.removeItem("authToken");
  }
}
