import { Routes } from '@angular/router';
import {App} from './app';
import {onlyLoggedGuard} from './features/auth/guards/only-logged.guard';
import {blockIfLoggedGuard} from './features/auth/guards/block-if-logged.guard';

export const routes: Routes = [
  {
    path: '',
    component: App,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./features/auth/auth.routes').then((r): Routes => r.authRoutes),
        resolve: [blockIfLoggedGuard]
      },
      {
        path: 'guess',
        loadChildren: () =>
          import('./guess/guess.routes').then((r): Routes => r.guessRoutes),
        resolve: [onlyLoggedGuard]
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
