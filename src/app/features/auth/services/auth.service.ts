import {Injectable} from '@angular/core';
import {User} from '../entities/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = environment.apiUrl + '/auth';

  public constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly tokenService: TokenService,
  ) {
    this.me();
  }

  private readonly _user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this._user$.asObservable()

  public saveUser(user: User): void {
    this._user$.next(user);
  }

  public me(): void {
    this.http.get<User>(`${this.apiUrl}/me`).subscribe((user: User): void => {
      this.saveUser(user);
    })
  }

  public logout(): void {
    this._user$.next(null);
    this.tokenService.accessToken = '';
    this.router.navigate(['auth', 'login']);
  }
}
