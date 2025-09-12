import { Component } from '@angular/core';
import {Google} from '../../services/google';


@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {


  public constructor(
    protected readonly google: Google,
  ) {
  }

}
