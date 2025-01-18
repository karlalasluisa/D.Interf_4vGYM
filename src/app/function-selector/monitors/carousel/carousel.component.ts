import { Component } from '@angular/core';
import { MonitorComponent } from './monitor/monitor.component';
import { MonitorsServiceService } from '../../../../Services/monitors-service.service';
import { Monitor } from '../../../../models/Monitor';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { ModalService } from '../../../../Services/modal.service';
@Component({
  selector: 'app-carousel',
  imports: [MonitorComponent, CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  standalone: true
})
export class CarouselComponent {
  monitors: Monitor[] = [];
  currentIndex: number = 0;
  itemsPerPage: number = 3;
  showModal = false;


  listMonitorsAsync$!: Observable<Monitor[]>;
  constructor(private monitorService: MonitorsServiceService, private modalService: ModalService) { }


  ngOnInit(): void {
    this.listMonitorsAsync$ = this.monitorService.getMonitors();
    this.listMonitorsAsync$.subscribe((data) => {
      this.monitors = data; // Carga los datos en el arreglo local
    });

    //aquí debería actualizar la lista de monitores al editar y crear

  }
  editMonitor(monitor: Monitor): void {
    this.modalService.editMonitor(monitor);
  }


  // Carrusel movimiento.TODO tengo que modificar el funcionamiento
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
