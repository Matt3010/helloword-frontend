import { Routes } from '@angular/router';
import {App} from './app';
import {onlyLogged} from './features/auth/guards/only-logged';
import {blockIfLogged} from './features/auth/guards/block-if-logged';

export const routes: Routes = [
  {
    path: '',
    component: App,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./features/auth/auth.routes').then((r): Routes => r.authRoutes),
        resolve: [blockIfLogged]
      },
      {
        path: 'guess',
        loadChildren: () =>
          import('./guess/guess.routes').then((r): Routes => r.guessRoutes),
        resolve: [onlyLogged]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'guess/global'
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'guess/global'
      }
    ]
  },
];
