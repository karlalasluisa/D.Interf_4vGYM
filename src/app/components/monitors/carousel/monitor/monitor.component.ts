
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Monitor } from '../../../../../models/Monitor';
import { ModalService } from '../../../../../Services/modal.service';
@Component({
  selector: 'app-monitor',
  imports: [],
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.scss',
  standalone: true,

})
export class MonitorComponent {

  @Input() monitor!: Monitor;
  @Output() edit = new EventEmitter<Monitor>();
  @Output() delete = new EventEmitter<Monitor>();


  editMonitor(event: Event): void {
    event.preventDefault();
    this.edit.emit(this.monitor);
  }

  deleteMonitor(event: Event): void {
    event.preventDefault();
    this.delete.emit(this.monitor);
  }

}
