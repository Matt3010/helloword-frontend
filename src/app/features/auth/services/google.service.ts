import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  private readonly apiUrl: string = environment.apiUrl + '/auth/google';

  public constructor(
   ) {}

  public login(): void {
    window.open(this.apiUrl, '_self');
  }

}
