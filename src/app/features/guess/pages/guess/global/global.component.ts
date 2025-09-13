import {Component} from '@angular/core';
import {GameService} from '../../../services/game.service';
import {letterToHex} from '../../../../common/utils/letterToHex';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlwaysFocusDirective} from '../../../../common/directives/always-focus.directive';
import {Game} from '../../../entities/game';

@Component({
  selector: 'app-global',
  imports: [
    FormsModule,
    AlwaysFocusDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './global.component.html',
  styleUrl: './global.component.scss'
})
export class GlobalComponent {
  protected initialControl: FormControl<string> = new FormControl<string>('', { nonNullable: true });

  public constructor(
      protected readonly gameService: GameService,
  ) {
    this.gameService.globalGame$.subscribe((game: Game | null): void => {
        if (game) {
          this.initialControl.setValue(game.initial);
        }
    });
  }

  protected preventSingleLetterDelete(event: KeyboardEvent): void {
    const value: string = this.initialControl.value ?? '';

    if (
      (event.key === 'Backspace' || event.key === 'Delete') &&
      value.length === 1
    ) {
      event.preventDefault();
      return;
    }

    if (event.key.toLowerCase() === 'a' && event.ctrlKey) {
      event.preventDefault();
    }
  }


  protected readonly letterToHex: (letter: string, saturation?: number, lightness?: number) => string = letterToHex;
}
