import {Component, input, InputSignal} from '@angular/core';
import {AsyncPipe, NgClass} from '@angular/common';
 import {letterToHex} from '../../../common/utils/letterToHex';
import {UserInfoComponent} from '../../components/user-info/user-info.component';
import {GlobalGameService} from '../../../games/global/services/global-game.service';

@Component({
  selector: 'app-settings',
  imports: [
    NgClass,
    AsyncPipe,
    UserInfoComponent
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  public showSettings: InputSignal<boolean> = input.required<boolean>();

  public constructor(protected gameService: GlobalGameService) {
  }

  protected readonly letterToHex: (letter: string, saturation?: number, lightness?: number) => string = letterToHex;
}
