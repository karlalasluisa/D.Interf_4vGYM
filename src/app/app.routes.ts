import { Routes } from '@angular/router';
import { ActivitiesComponent } from './activities/activities.component';
import { MonitorsComponent } from './monitors/monitors.component';

export const routes: Routes = [
    { path: 'goto-activities', component: ActivitiesComponent },
    { path: 'goto-monitors', component: MonitorsComponent }
];
