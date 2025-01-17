import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Monitor } from '../../../../../models/Monitor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-monitor-edit',
  imports: [FormsModule],
  templateUrl: './form-monitor-edit.component.html',
  styleUrl: './form-monitor-edit.component.scss',
  standalone: true
})
export class FormMonitorEditComponent {
  @Input() monitor!: Monitor; // Recibe el monitor a editar
  @Output() save = new EventEmitter<Monitor>(); // Emite el monitor actualizado
  @Output() cancel = new EventEmitter<void>(); // Emite cuando se cancela

  onSubmit() {
    this.save.emit(this.monitor); // Emitir el monitor actualizado
  }

  onCancel() {
    this.cancel.emit(); // Emitir evento de cancelación
  }

}