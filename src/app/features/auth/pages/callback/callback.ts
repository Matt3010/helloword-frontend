import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Token} from '../../services/token';
import {User} from '../../entities/user';
import {Auth} from '../../services/auth';

@Component({
  selector: 'app-callback',
  template: `<p>Redirecting...</p>`
})
export class Callback implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly token: Token,
    private readonly auth: Auth,
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
        this.router.navigate(['auth', 'login']);
      }
    });
  }
}
