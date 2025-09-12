import {Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login';
import {Callback} from './pages/callback/callback';

export const authRoutes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: ':provider/callback',
    component: Callback
  },
]
