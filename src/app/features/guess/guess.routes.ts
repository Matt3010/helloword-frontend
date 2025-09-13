import {Routes} from '@angular/router';
import {GlobalComponent} from './pages/guess/global/global.component';
import {GuessComponent} from './guess.component';

export const guessRoutes: Routes = [
  {
    path: '',
    component: GuessComponent,
    children: [
      {
        path: 'global',
        component: GlobalComponent,
      }
    ]
  },

]
