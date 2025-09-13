import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TokenService} from '../../services/token.service';
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
   ) {}

  public ngOnInit(): void {
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
      if (token) {
        this.token.accessToken = token;
        this.router.navigate(['/']);
      } else {
        this.callbackTemplateContent = 'Bad login!'
      }
    });
  }
}
