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
        path: '',
        loadChildren: () =>
          import('./features/games/global/global-game.routes').then((r): Routes => r.globalGameRoutes),
        resolve: [onlyLoggedGuard]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'global'
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'global'
      }
    ]
  },
];
