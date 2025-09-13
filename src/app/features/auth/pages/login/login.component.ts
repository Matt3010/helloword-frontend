import { Component } from '@angular/core';
import {GoogleService} from '../../services/google.service';


@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  public constructor(
    protected readonly google: GoogleService,
  ) {
  }

}
