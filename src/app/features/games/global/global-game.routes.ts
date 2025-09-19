import {Routes} from '@angular/router';
 import {GlobalGameComponent} from './global-game.component';
import {GlobalComponent} from './pages/global/global.component';

export const globalGameRoutes: Routes = [
  {
    path: '',
    component: GlobalGameComponent,
    children: [
      {
        path: '',
        component: GlobalComponent,
      }
    ]
  },

]
