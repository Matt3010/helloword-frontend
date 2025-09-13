import {Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {CallbackComponent} from './pages/callback/callback.component';

export const authRoutes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: ':provider/callback',
    component: CallbackComponent
  },
]
