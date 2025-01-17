import { Component,Input } from '@angular/core';
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
//Llama al servicio para abrir el Modal y le pasa los datos del MONITor


  @Input() monitor!: Monitor; 
  isModalOpen = false;

  constructor(private modalService: ModalService) { }

  openModal($event: Event) {
    $event.preventDefault();
    alert(this.monitor==null);
    this.modalService.openEditModal(this.monitor);
   
  }


  closeModal() {
    this.isModalOpen = false;
  }

  saveMonitor(updatedMonitor: Monitor) {
    this.monitor = { ...updatedMonitor };
    this.closeModal();
  }
}
