import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ModalService } from '../../../../../Services/modal.service';
import { Monitor } from '../../../../../models/Monitor';
import { CommonModule } from '@angular/common';
import { FormMonitorComponent } from '../form-monitor/form-monitor.component';

@Component({
  selector: 'app-modal-forms',
  imports: [CommonModule, FormMonitorComponent],
  templateUrl: './modal-forms.component.html',
  styleUrls: ['./modal-forms.component.scss'], // Archivo de estilos
  standalone: true
})
  
// Componente que muestra un modal para crear o editar un monitor

export class ModalFormsComponent {
  // Indica si se está creando un monitor o editando
  isCreating: boolean = false;
  // Monitor que se está editando
  monitorEdited: Monitor | null = null;

  constructor(private modalService: ModalService) {
    // Suscribirse a los cambios de monitor seleccionado
    this.modalService.monitorSelected$.subscribe((monitor) => {
      this.monitorEdited = monitor;
    });

    // Suscribirse a los cambios de creación de monitor
    this.modalService.isCreating$.subscribe((isCreating) => {
      this.isCreating = isCreating;
    });
  }

  // Cierra el modal
  close(): void{
    this.modalService.closeModal(); 
  }

}

