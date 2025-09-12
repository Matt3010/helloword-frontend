import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Google {
  private readonly apiUrl: string = environment.apiUrl + '/auth/google';

  public constructor(
    private readonly http: HttpClient,
   ) {}

  public login(): void {
    window.open(this.apiUrl, '_blank'); // nuova scheda
  }

}
