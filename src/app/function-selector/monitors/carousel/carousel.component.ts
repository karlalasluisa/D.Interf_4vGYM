import { Component } from '@angular/core';
import { MonitorComponent } from './monitor/monitor.component';
import { MonitorsServiceService } from '../../../Services/monitors-service.service';
import { Monitor } from '../../../models/Monitor';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { ModalService } from '../../../Services/modal.service';
import { ModalFormsComponent } from "./modal-forms/modal-forms.component";
import { FormMonitorEditComponent } from './form-monitor-edit/form-monitor-edit.component';
@Component({
  selector: 'app-carousel',
  imports: [MonitorComponent, CommonModule, ModalFormsComponent, FormMonitorEditComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {  
  monitors: Monitor[] = [];
  currentIndex: number = 0;
  itemsPerPage: number = 3;

  showModal = false;
  monitorToEdit: Monitor | null = null; // Variable para almacenar el monitor que se editará

  listMonitorsAsync$!: Observable<Monitor[]>;

  constructor(private monitorService: MonitorsServiceService, private modalService: ModalService) { }


  ngOnInit(): void {
    this.listMonitorsAsync$ = this.monitorService.getMonitors();
    this.listMonitorsAsync$.subscribe((data) => {
      this.monitors = data;
    });

    //Suscribirse al Observable para recibir el evento de apertura del modal de editar
    this.modalService.openModalEdit$.subscribe((monitor) => {
      this.monitorToEdit = monitor;
      this.showModal = true; 

    });
  } 

  saveChanges(updatedMonitor: Monitor) {
    console.log('Datos guardados del monitor:' + updatedMonitor.name);
    this.showModal = false;
  }

  // Carrusel movimiento
  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex -= this.itemsPerPage;
    }
  }

  next() {
    if (this.currentIndex + this.itemsPerPage < this.monitors.length) {
      this.currentIndex += this.itemsPerPage;
    }
  }

  //Borrar monitor

}
