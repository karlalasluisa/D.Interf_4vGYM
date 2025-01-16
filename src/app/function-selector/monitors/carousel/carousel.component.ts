import { Component } from '@angular/core';
import { MonitorComponent } from './monitor/monitor.component';
import { MonitorsServiceService } from '../../../../Services/monitors-service.service';
import { Monitor } from '../../../../models/Monitor';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-carousel',
  imports: [MonitorComponent, CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  monitors: Monitor[] = [];
  currentIndex: number = 0;
  itemsPerPage: number = 3;
  filteredMonitors: Monitor[] = [];


  listMonitorsAsync$!: Observable<Monitor[]>;
  constructor(private monitorService: MonitorsServiceService) { }


  ngOnInit(): void {
    this.listMonitorsAsync$ = this.monitorService.getMonitors();
  }


  // Carrusel movimiento.TODO tengo que modificar el funcionamiento
  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex -= this.itemsPerPage;
    }
  }

  next() {
    if (this.currentIndex + this.itemsPerPage < this.filteredMonitors.length) {
      this.currentIndex += this.itemsPerPage;
    }
  }

}
