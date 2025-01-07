import {ChangeDetectionStrategy, Component, model} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';


@Component({
  standalone: true,
  selector: 'app-calendar',
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatDatepickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  selected = model<Date | null>(null);
}
