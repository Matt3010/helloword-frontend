import {Injectable} from '@angular/core';
 import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
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

  // Service
  public guess(word: string, cb?: () => void): void {
    this.http.post<{ correct: boolean }>(`${this.apiUrl}/guess`, { word }).subscribe({
      next: (res: { correct: boolean }): void => {
        if (res.correct) {
          cb?.(); // esegui callback se presente
          this.current();
        } else {
          this.authService.me();
          const currentGame: GlobalGame | null = this._globalGame$.value;
          if (!currentGame) {
            this.current();
            return;
          }
          currentGame.initial = currentGame.initial[0];
          this._globalGame$.next(currentGame);
        }
      },
      error: (err: HttpErrorResponse): void => {
        // TODO - handle error
      }
    });
  }


  public leaderboard(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/leaderboard`);
  }


}
