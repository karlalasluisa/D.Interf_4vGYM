import { Component, ChangeDetectorRef  } from '@angular/core';
import { CalendarComponent } from './calendar/calendar.component';
import { TableActivitiesComponent } from './table-activities/table-activities.component';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { Observable } from 'rxjs/internal/Observable';
import { AcivityServiceService } from '../../Services/acivity-service.service';
import { DateServiceService } from '../../Services/date-service.service';

@Component({
  selector: 'app-activities',
  imports: [CalendarComponent, TableActivitiesComponent ],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss',
  standalone: true,

})
export class ActivitiesComponent {

  selected: Date = new Date();

  constructor(private dateService: DateServiceService) {}

  ngOnInit(): void {
    // Suscribirse a los cambios de fecha desde el servicio
    this.dateService.dateChanges$.subscribe((newDate: Date) => {
      this.selected = newDate;
    });

    // Notificar la fecha inicial al servicio
    this.dateService.notifyDateChange(this.selected);
  }

  onDateChange(newDate: Date): void {
    this.dateService.notifyDateChange(newDate); // Actualizar la fecha desde cualquier fuente
  }
}

