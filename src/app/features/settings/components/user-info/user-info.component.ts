import {Component} from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import {letterToHex} from '../../../common/utils/letterToHex';
import {GlobalGameService} from '../../../games/global/services/global-game.service';
import {BounceOnClickDirective} from '../../../common/directives/bounce-click.directive';

@Component({
  selector: 'app-user-info',
  imports: [
    AsyncPipe,
    NgOptimizedImage,
    BounceOnClickDirective
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {

  public constructor(
    protected readonly authService: AuthService,
    protected readonly gameService: GlobalGameService,
  ) {
  }

  protected readonly letterToHex: (letter: string, saturation?: number, lightness?: number) => string = letterToHex;
}
