import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AuthService} from '../features/auth/services/auth.service';
import {AsyncPipe, JsonPipe} from '@angular/common';

@Component({
  selector: 'app-guess.component',
  imports: [
    RouterOutlet,
    AsyncPipe,
    JsonPipe,
  ],
  template: `
    {{authService.user$ | async | json}}


  `
})
export class GuessComponent {

  public constructor(
    protected readonly authService: AuthService,
  ) {
  }


}
