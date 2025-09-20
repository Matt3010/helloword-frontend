import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, filter, Observable} from 'rxjs';
import {GlobalGame} from '../entities/global-game';
import {AuthService} from '../../../auth/services/auth.service';
import {environment} from '../../../../../environments/environment';
import {User} from '../../../auth/entities/user';


@Injectable({
  providedIn: 'root'
})
export class GlobalGameService {
  private readonly apiUrl: string = environment.apiUrl + '/game';
  private readonly _globalGame$: BehaviorSubject<GlobalGame | null> = new BehaviorSubject<GlobalGame | null>(null);
  public readonly globalGame$: Observable<GlobalGame | null> = this._globalGame$.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService,
  ) {
    this.current();

    this.authService.user$
      .pipe(
        filter((user: User | null): boolean => !!user),
      )
      .subscribe((): void => {
        this.current();
      })
  }


  public current(): void {
    this.http.get<GlobalGame | null>(`${this.apiUrl}/current`)
      .subscribe({
        next: (game: GlobalGame | null): void => {
            this._globalGame$.next(game);
        },
        error: (): void => {
          // TODO - Implement error.
        }
      });
  }

  public guess(word: string, cbCorrect?: () => void, cbNotCorrect?: () => void, cbError?: () => void): void {
    this.http.post<{ correct: boolean }>(`${this.apiUrl}/guess`, { word })
      .subscribe({
      next: (res: { correct: boolean }): void => {
        if (res.correct) {
          cbCorrect?.();
        } else {
          cbNotCorrect?.();
        }
        this.current();
        this.authService.me();
      },
      error: (err: HttpErrorResponse): void => {
        if(err.status === 400 && err.error?.message === 'No attempts left today') {
          cbError?.();
        } else {
          // TODO - Implement error.
        }
      }
    });
  }


  public leaderboard(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/leaderboard`);
  }


}
