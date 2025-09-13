import {Injectable} from '@angular/core';
 import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Game} from '../entities/game';
import {environment} from '../../../../environments/environment';
import {ErrorService} from '../../common/services/error.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly apiUrl: string = environment.apiUrl + '/game';
  private readonly _globalGame$: BehaviorSubject<Game | null> = new BehaviorSubject<Game | null>(null);
  public readonly globalGame$: Observable<Game | null> = this._globalGame$.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly errorService: ErrorService
  ) {
    this.current();
  }

  public current(): void {
    this.http.get<Game | null>(`${this.apiUrl}/current`)
      .subscribe({
        next: (game: Game | null) => {
            this._globalGame$.next(game);
        },
        error: (err: Error) => {
          this.errorService.pushError(err);
        }
      });
  }
}
