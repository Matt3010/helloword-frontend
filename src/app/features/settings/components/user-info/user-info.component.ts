import { Component } from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import {GameService} from '../../../guess/services/game.service';
import {letterToHex} from '../../../common/utils/letterToHex';

@Component({
  selector: 'app-user-info',
  imports: [
    AsyncPipe,
    NgOptimizedImage
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {

  public constructor(
    protected readonly authService: AuthService,
    protected readonly gameService: GameService,
  ) {
  }

  protected readonly letterToHex = letterToHex;
}
