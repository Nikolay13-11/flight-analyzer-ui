import { Routes } from '@angular/router';
import {
  AboutComponent,
  AnalyseComponent,
  ScheduleComponent,
} from './main/views';
import { NotFoundComponent } from './common/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'analyse',
    pathMatch: 'full',
  },
  {
    path: 'analyse',
    component: AnalyseComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'schedule',
    component: ScheduleComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
