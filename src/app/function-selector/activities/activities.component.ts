import { Component, ChangeDetectorRef  } from '@angular/core';
import { CalendarComponent } from './calendar/calendar.component';
import { TableActivitiesComponent } from './table-activities/table-activities.component';

@Component({
  selector: 'app-activities',
  imports: [CalendarComponent, TableActivitiesComponent ],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss',
  standalone: true,

})
export class ActivitiesComponent {
  [x: string]: any;
  selected: Date = new Date();

  constructor(private cdr: ChangeDetectorRef) { }

  

  onDateChange(newDate: Date): void {
    console.log(this.selected.toISOString() + "fecha anteriror al cambio"); 
    this.selected = newDate; // Actualiza la fecha seleccionada = newDate;
    console.log("Estamos cambiando de fecha loco");
    console.log(newDate.toISOString()+ "fecha con cambio");
    this.cdr.detectChanges();
  }
}

