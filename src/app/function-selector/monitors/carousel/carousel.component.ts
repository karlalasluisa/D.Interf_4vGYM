import { Component } from '@angular/core';
import { MonitorComponent } from './monitor/monitor.component';
import { MonitorsServiceService } from '../../../Services/monitors-service.service';
import { Monitor } from '../../../models/Monitor';
import { CommonModule } from '@angular/common';
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

  constructor(private monitorService: MonitorsServiceService) { }

  ngOnInit(): void {
    this.monitorService.getMonitors().subscribe((data) => {
      this.monitors = data;
      this.filteredMonitors = [...this.monitors];
    });
  }
  // Carrusel movimiento
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
