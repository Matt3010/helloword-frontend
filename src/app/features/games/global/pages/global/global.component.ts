import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core'; // Importa ViewChild e ElementRef
import {letterToHex} from '../../../../common/utils/letterToHex';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlwaysFocusDirective} from '../../../../common/directives/always-focus.directive';
import {AutofitFontDirective} from '../../../../common/directives/auto-fit.directive';
import {BounceOnClickDirective} from '../../../../common/directives/bounce-click.directive';
import JSConfetti from 'js-confetti'
import {GlobalGameService} from '../../services/global-game.service';
import {GlobalGame} from '../../entities/global-game';
import {debounce, DebouncedFunc} from 'lodash';

@Component({
  selector: 'app-global',
  imports: [
    FormsModule,
    AlwaysFocusDirective,
    ReactiveFormsModule,
    AutofitFontDirective,
    BounceOnClickDirective,
  ],
  templateUrl: './global.component.html',
  styleUrl: './global.component.scss'
})
export class GlobalComponent {
  @ViewChild('initialInput') private readonly initialInput!: ElementRef<HTMLInputElement>;
  @Output('noAttemptsLeft') protected noAttemptsLeft: EventEmitter<null> = new EventEmitter<null>();

  protected gameForm: FormGroup<{
    id: FormControl<string>;
    initial: FormControl<string>;
    createdAt: FormControl<Date>;
  }> = new FormGroup({
    id: new FormControl<string>('', { nonNullable: true }),
    initial: new FormControl<string>('', { nonNullable: true }),
    createdAt: new FormControl<Date>(new Date(), { nonNullable: true }),
  });


  public constructor(
    protected readonly globalService: GlobalGameService,
  ) {
    this.globalService.globalGame$.subscribe((game: GlobalGame | null): void => {
      if (game) {
        this.gameForm.setValue({
          id: game.id,
          initial: game.initial,
          createdAt: new Date(game.createdAt),
        });
      }
    });
  }

  protected moveCursorToEnd(): void {
    setTimeout(() => {
      const input: HTMLInputElement = this.initialInput.nativeElement;
      const length: number = input.value.length;
      input.setSelectionRange(length, length);
    }, 0);
  }

  protected preventSingleLetterDelete(event: KeyboardEvent): void {
    const value: string = this.gameForm.controls.initial.value ?? '';

    if (
      (event.key === 'Backspace' || event.key === 'Delete') &&
      value.length === 1
    ) {
      event.preventDefault();
    }

    if (event.key.toLowerCase() === 'a' && event.ctrlKey) {
      event.preventDefault();
    }

    if (event.key === 'Enter' && this.gameForm.controls.initial.value.length > 1) {
      this.debouncedGuess(this.gameForm.controls.initial.value);
    }
  }

  private readonly debouncedGuess: DebouncedFunc<(initial: string) => void> = debounce((initial: string) => {
    const jsConfetti = new JSConfetti();

    this.globalService.guess(
      initial,
      (): Promise<void> => jsConfetti.addConfetti({
        emojis: ['🎉', '✨', '💫', '🌟', '🥳', '🚀'],
        confettiNumber: 10,
        emojiSize: 100
      }),
      (): void => {
        this.keepOnlyInitial();
        jsConfetti.addConfetti({
          emojis: ['💀', '☠️', '💩', '👻', '👺', '👹'],
          confettiNumber: 10,
          emojiSize: 100
        });
      },
      (): void => {
        this.keepOnlyInitial();
        this.noAttemptsLeft.emit(null);
      }
    );
  }, 500);

  protected keepOnlyInitial(): void {
    const value: string = this.gameForm.controls.initial.value;
    if (value.length === 1) {
      return;
    }
    this.gameForm.controls.initial.setValue(this.gameForm.controls.initial.value[0])
  }

  protected readonly letterToHex: (letter: string, saturation?: number, lightness?: number) => string = letterToHex;
}
