import { Injectable } from '@angular/core';
import {User} from '../entities/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = environment.apiUrl + '/auth';

  public constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
  ) {
    this.me();
  }

  private readonly _user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public user$: Observable<User> = this._user$.asObservable()
    .pipe(
      filter((user): user is User => user !== null)
    );

  public saveUser(user: User): void {
    this._user$.next(user);
  }

  private me(): void {
    this.http.get<User>(`${this.apiUrl}/me`).subscribe((user: User): void => {
      this.saveUser(user);
    })
  }

  public logout(): void {
    this._user$.next(null);
    this.router.navigate(['/']);
  }
}
