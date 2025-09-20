import {Component, effect, input, InputSignal} from '@angular/core';
import {GlobalGameService} from '../../services/global-game.service';
import {AsyncPipe, NgClass, NgOptimizedImage} from '@angular/common';
import {letterToHex} from '../../../../common/utils/letterToHex';
import {User} from '../../../../auth/entities/user';
import {AuthService} from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-ranking',
  imports: [
    NgClass,
    AsyncPipe,
    NgOptimizedImage,
  ],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss',
  standalone: true
})
export class RankingComponent {
  public showRankings: InputSignal<boolean> = input.required<boolean>();
  protected leaderBoard: User[] | null = null;
  public constructor(
    protected gameService: GlobalGameService,
    protected authService: AuthService,
  ) {
    effect(() => {
      if (this.showRankings() && !this.leaderBoard) { // Prevent multiple calls
        this.loadLeaderboard();
      }
    });
  }

  private loadLeaderboard(): void {
    this.gameService.leaderboard().subscribe((leaderboard: User[]): void => {
      this.leaderBoard = leaderboard;
    });
  }

  getOrdinalSuffix(number: number): string {
    if (!number || number < 1) return '';
    const lastTwoDigits = number % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      return 'th';
    }

    const lastDigit = number % 10;
    switch (lastDigit) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  protected findLoggedUserPosition(loggedUserId: string): number {
    if (!this.leaderBoard) return 0; // Return 0 instead of -1 for better display
    return this.leaderBoard.findIndex(user => user.id === loggedUserId) + 1;
  }

  protected readonly letterToHex = letterToHex;
}
