import { Component } from '@angular/core';
import { CalendarComponent } from './calendar/calendar.component';

@Component({
  selector: 'app-activities',
  imports: [CalendarComponent],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
})
export class ActivitiesComponent {

}
