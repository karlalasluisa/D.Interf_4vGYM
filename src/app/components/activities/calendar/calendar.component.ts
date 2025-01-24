import {ChangeDetectionStrategy, Component, Input, ViewChild} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatCalendar, MatDatepickerModule} from '@angular/material/datepicker';
import { Subscription } from 'rxjs/internal/Subscription';
import { AcivityServiceService } from '../../../../Services/acivity-service.service';
import { DateServiceService } from '../../../../Services/date-service.service';
import { Activity } from '../../../../models/Activity';


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
  @Input() selectedDate!: Date;

  @ViewChild(MatCalendar, { static: false }) calendar!: MatCalendar<Date>; // Referencia al componente MatCalendar: como MatCalendar podía ser nulo, y no es un objeto como tal, se le hace referncia de esta manera. Fuente: ChatGPT

  selected: Date = new Date(); // Fecha seleccionada asociada al calendario y se actualizan entre ellos (variable <-> calendario)
  private subscription!: Subscription;

  constructor(private activityService: AcivityServiceService, private dateService: DateServiceService) {}

  ngOnInit(): void {
    // Suscribirse a cambios de fecha desde el servicio
    this.subscription = this.dateService.dateChanges$.subscribe((newDate: Date) => {
      this.selected = newDate; // Actualizar la fecha seleccionada
      if (this.calendar) {
        this.calendar.updateTodaysDate(); // Actualizar el calendario visualmente
      }
    });
  }

  onDateselected(newDate: Date): void {
    this.dateService.notifyDateChange(newDate); // Notificar el cambio al servicio
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
