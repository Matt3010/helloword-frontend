import {Component, input, InputSignal, OnInit, effect} from '@angular/core';
import {GlobalGameService} from '../../services/global-game.service';
import {AsyncPipe, NgClass, NgOptimizedImage} from '@angular/common';
import {letterToHex} from '../../../../common/utils/letterToHex';
import {User} from '../../../../auth/entities/user';

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
  protected leaderBoardPodium: User[] | null = null;
  protected readonly ranks: ({ height: string; image: null } | {
    height: string;
    image: string
  })[] = [
    { "height": "35%", "image": null },
    { "height": "45%", "image": "assets/first-place.png" },
    { "height": "40%", "image": "assets/second-place.png" }
  ];

  public constructor(protected gameService: GlobalGameService) {
    effect(() => {
      if (this.showRankings()) {
        this.loadLeaderboard();
      }
    });
  }

  private loadLeaderboard(): void {
    this.gameService.leaderboard().subscribe((leaderboard: User[]): void => {
       const first = leaderboard[0] ?? null;
      const second = leaderboard[1] ?? null;
      const third = leaderboard[2] ?? null;

      this.leaderBoardPodium = [];
      this.leaderBoardPodium[0] = second;
      this.leaderBoardPodium[1] = first;
      this.leaderBoardPodium[2] = third;
    });
  }


  protected readonly letterToHex = letterToHex;
}
