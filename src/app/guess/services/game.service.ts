import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Game} from '../entities/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly apiUrl: string = environment.apiUrl + '/game';
  private readonly _globalGame$: BehaviorSubject<Game | null> = new BehaviorSubject<Game | null>(null);
  public readonly globalGame$: Observable<Game | null> = this._globalGame$.asObservable();

  constructor(private readonly http: HttpClient) {
    this.current();
  }

  public current(): void {
    this.http.get<Game | null>(`${this.apiUrl}/current`)
      .subscribe((game: Game | null): void => {
        this._globalGame$.next(game);
      });
  }
}
