import { Component } from '@angular/core';
import { CalendarComponent } from './calendar/calendar.component';
import { ActivityComponent } from './activity/activity.component';

@Component({
  selector: 'app-activities',
  imports: [CalendarComponent, ActivityComponent],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
})
export class ActivitiesComponent {

}
