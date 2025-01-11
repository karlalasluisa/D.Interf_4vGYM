import { Component, Input, model, OnChanges, SimpleChanges } from '@angular/core';
import { CalendarComponent } from './calendar/calendar.component';
import { TableActivitiesComponent } from './table-activities/table-activities.component';

@Component({
  selector: 'app-activities',
  imports: [CalendarComponent, TableActivitiesComponent],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
})
export class ActivitiesComponent {
  selected: Date = new Date();

  constructor() { }

  

  onDateChange(newDate: Date): void {
    console.log(this.selected.toISOString());
    this.selected = newDate; // Actualiza la fecha seleccionada = newDate;
    console.log("2");
    console.log(newDate.toISOString());
  }
}

