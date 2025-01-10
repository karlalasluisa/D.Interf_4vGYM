import { Routes } from '@angular/router';
import { ActivitiesComponent } from './function-selector/activities/activities.component';
import { MonitorsComponent } from './function-selector/monitors/monitors.component';

export const routes: Routes = [
    { path: 'information-activities', component: ActivitiesComponent },
    { path: 'information-monitors', component: MonitorsComponent },
];