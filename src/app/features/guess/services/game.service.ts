import {Injectable} from '@angular/core';
 import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Game} from '../entities/game';
import {environment} from '../../../../environments/environment';
import {AuthService} from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly apiUrl: string = environment.apiUrl + '/game';
  private readonly _globalGame$: BehaviorSubject<Game | null> = new BehaviorSubject<Game | null>(null);
  public readonly globalGame$: Observable<Game | null> = this._globalGame$.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService,
  ) {
    this.current();
  }

  public current(): void {
    this.http.get<Game | null>(`${this.apiUrl}/current`)
      .subscribe({
        next: (game: Game | null): void => {
            this._globalGame$.next(game);
        },
        error: (): void => {
          // TODO - Implement error.
        }
      });
  }

  public guess(word: string): void {
    this.http.post<{ correct: boolean }>(`${this.apiUrl}/guess`, { word }).subscribe({
      next: (res: {correct: boolean}): void => {
        if (res.correct) {
          this.current();
        } else {
          this.authService.me();
          const currentGame: Game | null = this._globalGame$.value;
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

}
