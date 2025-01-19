import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Monitor } from '../../../../../models/Monitor';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../../../../Services/modal.service';
import { MonitorsServiceService } from '../../../../../Services/monitors-service.service';

@Component({
  selector: 'app-form-monitor-edit',
  imports: [FormsModule],
  templateUrl: './form-monitor-edit.component.html',
  styleUrl: './form-monitor-edit.component.scss',
  standalone: true
})
export class FormMonitorEditComponent {
  @Input() monitor!: Monitor; // Recibe el monitor a editar
  @Output() cancel = new EventEmitter<void>(); // Emite cuando se cancela
  isCreating: boolean = false;
  

  constructor(private modalService: ModalService, private monitorsService: MonitorsServiceService) { }
  
  ngOnInit() {
    this.modalService.isCreating$.subscribe((isCreating) => {
      this.isCreating = isCreating;
      if (this.isCreating) {
        this.monitor = {
          id: 0, name: '', email: '', phone: '', photo: '' };
      }
    })
  }
  saveMonitor() {
    //todo falta recargar la lista
    if (this.isCreating) {
      this.monitorsService.addMonitor(this.monitor!).subscribe((addMonitor) => {
        this.modalService.notifyMonitorUpdated(addMonitor);
        this.modalService.closeModal();
        }
      );
    }
    this.monitorsService.updateMonitor(this.monitor!).subscribe((updatedMonitor) => {
      this.modalService.notifyMonitorUpdated(updatedMonitor);
      this.modalService.closeModal();
    });
  }

  onCancel() {
    this.modalService.closeModal(); // Emitir evento de cancelación
  }

}