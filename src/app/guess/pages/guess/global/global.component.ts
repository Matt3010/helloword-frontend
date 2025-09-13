import {Component} from '@angular/core';
import {GameService} from '../../../services/game.service';
import {letterToHex} from '../../../../common/utils/letterToHex';
import {FormsModule} from '@angular/forms';
import {AlwaysFocusDirective} from '../../../../common/directives/always-focus.directive';
import {Game} from '../../../entities/game';

@Component({
  selector: 'app-global',
  imports: [
    FormsModule,
    AlwaysFocusDirective,
  ],
  templateUrl: './global.component.html',
  styleUrl: './global.component.scss'
})
export class GlobalComponent {
  protected initial: string = '';

  public constructor(
      protected readonly gameService: GameService,
  ) {
    this.gameService.globalGame$.subscribe((game: Game | null) => {
      if (game) {
        this.initial = game.initial;
      }
    });
  }

  protected chooseCorrectPlaceholder(): string {
    return this.initial.length === 0 ? 'No game' : 'Type a word...';
  }

  protected readonly letterToHex: (letter: string, saturation?: number, lightness?: number) => string = letterToHex;
}
