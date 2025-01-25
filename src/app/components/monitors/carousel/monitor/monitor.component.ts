
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Monitor } from '../../../../../models/Monitor';
@Component({
  selector: 'app-monitor',
  imports: [],
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.scss',
  standalone: true,

})

// Componente que muestra un monitor.
// Muestra una tarjeta con la información del monitor y botones para editar o eliminar.

export class MonitorComponent {

  // Monitor a mostrar.
  @Input() monitor!: Monitor;

  // Evento emitido cuando se hace clic en el botón de editar.
  @Output() edit = new EventEmitter<Monitor>();

  // Evento emitido cuando se hace clic en el botón de eliminar.
  @Output() delete = new EventEmitter<Monitor>();

  // Edita el monitor.
  editMonitor(event: Event): void {
    event.preventDefault();
    this.edit.emit(this.monitor);
  }

  // Elimina el monitor.
  deleteMonitor(event: Event): void {
    event.preventDefault();
    this.delete.emit(this.monitor);
  }

}

