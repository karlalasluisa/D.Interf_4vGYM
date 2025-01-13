import {ChangeDetectionStrategy, Component, EventEmitter, Input, model, Output, SimpleChanges} from '@angular/core';
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

/*Lo voy a explicar por que lo he buscado en foros y convinado con lo que sabía hacer:
[(selected)]="selected" hace que la fecha seleccionada se actualice en la variable
(selectedChange)="onDateSelected(selected)" envia la fecha seleccionada al padre

@Output() dateChange = new EventEmitter<Date>(); 
Es un emisor de eventos (EventEmitter) que notifica al componente padre cada vez que cambia la fecha seleccionada.
El componente padre puede suscribirse a este evento.

onDateSelected(newDate: Date): void {
    this.dateChange.emit(newDate);
    console.log(newDate);
  }
emite la fecha para que el padre la reciba
*/
export class CalendarComponent { 
  @Output() dateChange = new EventEmitter<Date>();
  @Input() selectedDate!: Date;
  selected: Date = new Date();
  
  
  ngOnInit(): void {
    this. selected = this.selectedDate;
    this.onDateselected(this.selectedDate);
    console.log(this.selected + "fecha cargada");
  }

  onDateselected(newDate: Date): void {
    this.dateChange.emit(newDate);
    //console.log(newDate.toISOString() + "se manda la fecha");
  }

  /*ngOnChanges(changes: SimpleChanges): void {
    // React a cambios en selectedDate
    if (changes['selectedDate'] && changes['selectedDate'].currentValue) {
      this.selected = changes['selectedDate'].currentValue;
    }
  }*/
}
