import { Component } from '@angular/core';
import { MonitorComponent } from './monitor/monitor.component';
import { MonitorsServiceService } from '../../../../Services/monitors-service.service';
import { Monitor } from '../../../../models/Monitor';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { ModalService } from '../../../../Services/modal.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
/**
 * Componente que muestra un carrusel de monitores.
 * Muestra una barra de búsqueda, un botón para agregar un monitor y un carrusel con los monitores.
 * El carrusel permite moverse entre los monitores y editar o eliminar cada monitor.
 */
@Component({
  selector: 'app-carousel',
  imports: [MonitorComponent, CommonModule, MatProgressSpinnerModule, FormsModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  standalone: true
})
export class CarouselComponent {
  monitors: Monitor[] = [];
  /**
   * Indica el índice actual en el que se encuentra el carrusel.
   * Se utiliza para mostrar los monitores correspondientes.
   */
  currentIndex: number = 0;
  /**
   * Número de monitores que se muestran en el carrusel.
   * Se utiliza para calcular el índice actual y mostrar los monitores correspondientes.
   */
  itemsPerPage: number = 3;
  /**
   * Indica si se está cargando los monitores.
   * Se utiliza para mostrar un spinner mientras se cargan los monitores.
   */
  isLoading: boolean = false;

  //Para la barra buscar
  filteredMonitors: Monitor[] = []; // Monitores después de filtrar
  searchQuery: string = ''; // Texto ingresado para la búsqueda


  listMonitorsAsync$!: Observable<Monitor[]>;
  constructor(private monitorService: MonitorsServiceService, private modalService: ModalService) { }


  ngOnInit(): void {
    this.isLoading = true;
    
    this.loadMonitors();

    this.modalService.monitorDeleted$.subscribe((monitorId) => {
      if (monitorId !== null) {
        this.loadMonitors();
      }
    });
  
  }
  /**
   * Carga los monitores desde el servicio.
   * Se utiliza para inicializar el componente.
   */
  loadMonitors(): void {
    this.modalService.monitorSelected$.subscribe(() => {
      this.listMonitorsAsync$ = this.monitorService.getMonitors();
    this.listMonitorsAsync$.subscribe((data) => {
      this.monitors = data; // Carga los datos en el arreglo local

      this.filteredMonitors = [...this.monitors]; // al inicio sin filtrar

      this.isLoading = false; // Oculta el spinner
    });
    })
    
  }
  /**
   * Filtra los monitores según el texto ingresado.
   * Se utiliza para buscar monitores en el carrusel.
   */
  filterMonitors(): void {
    const query = this.searchQuery.toLowerCase();
    
    
    this.filteredMonitors = this.monitors.filter((monitor) =>
      monitor.name.toLowerCase().includes(query)
    );
    this.currentIndex = 0; //Reinicio el índice del carrusel al inicio
  }

  // Editar monitor
  editMonitor(monitor: Monitor): void {
    this.modalService.editMonitor(monitor);
  }
  //Crear
  createMonitor(): void {
    this.searchQuery = '';

    this.modalService.createMonitor();
  }

  deleteMonitor(monitor: Monitor): void {
    if (confirm('¿Estas seguro de que deseas eliminar este monitor?')) { 
      this.monitorService.deleteMonitor(monitor.id).subscribe(() => {
        this.modalService.deleteMonitor(monitor); //notifica la eliminación
      });
    }
  }
  // Carrusel movimiento.TODO tengo que modificar el funcionamiento
  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex -= this.itemsPerPage;
    }
  }

  next() {
    this.isLoading = true;
    if (this.currentIndex + this.itemsPerPage < this.monitors.length) {
      this.currentIndex += this.itemsPerPage;
    }
    this.isLoading = false;
  }

}

 