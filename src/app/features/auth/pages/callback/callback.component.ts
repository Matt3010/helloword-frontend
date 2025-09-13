import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TokenService} from '../../services/token.service';
import {User} from '../../entities/user';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-callback',
  template: `{{callbackTemplateContent}}`
})
export class CallbackComponent implements OnInit {
  protected callbackTemplateContent: string = 'Redirecting...';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly token: TokenService,
    private readonly auth: AuthService,
   ) {}

  ngOnInit(): void {
    const scope = this.route.snapshot.data['scope'] ?? this.route.snapshot.paramMap.get('provider');
    if (scope === 'google') {
      this.handleGoogle();
    } else {
      this.router.navigate(['auth', 'login']);
    }
  }

  private handleGoogle(): void {
    this.route.queryParams.subscribe((params: Params): void => {
      const token: string = params['authToken'];
      console.log(params['user'])
      const user: User = JSON.parse(params['user']);
      if (token && user) {
        this.token.accessToken = token;
        this.auth.saveUser(user);
        this.router.navigate(['/']);
      } else {
        this.callbackTemplateContent = 'Bad login!'
      }
    });
  }
}
