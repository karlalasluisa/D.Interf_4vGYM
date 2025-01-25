import { Component, Input } from '@angular/core';
import { Activity } from '../../../../../models/Activity';
import { MonitorSimpleComponent } from './monitor-simple/monitor-simple.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { WindowServiceService } from '../../../../../Services/window-service.service';
import { AcivityServiceService } from '../../../../../Services/acivity-service.service';
import { Subscription, take } from 'rxjs';
import _ from 'lodash';


@Component({
  selector: 'app-activity',
  imports: [CommonModule, MonitorSimpleComponent, MatDialogModule],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {
  // Input decorador para recibir datos desde un componente padre.
  @Input() index!: number; // Índice de la actividad para saber en qué posición se encuentra, aunque sea null.
  @Input() activity!: Activity | null; // Actividad actual a mostrar (puede ser null si no hay actividad).

  // Variables auxiliares
  indexAuxiliar: number = -1; // Variable para almacenar la posición de la actividad en el array para la fecha actual.
  activitySubscription!: Subscription; // Suscripción para manejar eventos de actividad.

  // Constructor: Inyección de dependencias para servicios de ventana y actividad.
  constructor(private windowService: WindowServiceService, private activityService: AcivityServiceService) {}

  // Método para abrir una ventana de superposición (overlay).
  openOverlay($event: Event, button: string) {
    // Cancelar la suscripción previa, si existe, para evitar fugas de memoria.
    if (this.activitySubscription) {
      this.activitySubscription.unsubscribe();
    }
  
    $event.preventDefault(); // Prevenir el comportamiento predeterminado del evento.

    // Mostrar la ventana del servicio de ventana.
    this.windowService.show();
    this.windowService.setButton(button); // Configurar el botón (crear o editar).

    // Lógica para creación de actividad.
    if (button === 'create') {
      this.activity = null; // Limpiar actividad para crear una nueva.
      this.activityService.notifyActivityChange(this.activity); // Notificar que no hay actividad seleccionada.
      this.windowService.setIndex(this.index); // Establecer el índice en el servicio.
    }
  
    // Lógica para edición de actividad.
    if (this.activity != null && button === 'edit') {
      this.activityService.notifyActivityChange(this.activity); // Notificar la actividad seleccionada.
    }
  
    // Suscribirse a cambios en el índice desde el servicio de ventana.
    this.windowService.index$.subscribe(data => this.indexAuxiliar = data);

    // Si el índice coincide, actualizamos la actividad localmente.
    if (this.indexAuxiliar !== -1 && this.indexAuxiliar === this.index) {
      let act: Activity | null = null;

      // Suscribirse al stream de cambios de actividad, pero escuchar solo la primera emisión.
      this.activityService.activityChanges$
        .pipe(take(1)) // Escuchar la primera emisión y desuscribirse automáticamente.
        .subscribe(activity => {
          act = activity; // Actualizar la actividad recibida.
          this.activity = _.cloneDeep(act); // Clonar profundamente la actividad para evitar mutaciones no deseadas.
        });
    }
  }

  // Método para borrar una actividad.
  onDeleteActivity($event: Event) {
    $event.preventDefault(); // Prevenir el comportamiento predeterminado del evento.

    // Confirmar antes de borrar.
    if (window.confirm(`¿Estas segur@ que quieres borrar la actividad?`)) {
      if (this.activity != null) {
        this.activityService.deleteActivity(this.activity?.id); // Llamar al servicio para eliminar la actividad.
        this.activity = null; // Limpiar la actividad localmente.
        this.activityService.notifyActivityChange(null); // Notificar que no hay actividad seleccionada.
      }
    }
  }

  // Método para obtener la URL de la imagen según el tipo de actividad.
  getImagUrl() { 
    if (this.activity != null) {
      // Seleccionar la URL dependiendo del tipo de actividad.
      switch (this.activity.activityType.id) {
        case 1:
          return "https://media.istockphoto.com/id/500130316/es/foto/mujer-cauc%C3%A1sica-practicar-yoga-en-seashore.jpg?s=612x612&w=0&k=20&c=oGQV3_eiNx8qq6xX8brq2U-UalIsw3vVamJrVRl6eUQ=";
        case 2:
          return "https://cuidateplus.marca.com/sites/default/files/styles/ratio_1_1/public/cms/2022-12/running-consejos-principiantes.jpg.webp?itok=0TWe3frA";
        default:
          return "https://media.istockphoto.com/id/1322158059/es/foto/mancuerna-botella-de-agua-toalla-en-el-banco-en-el-gimnasio.jpg?s=612x612&w=0&k=20&c=6wc4q5s37IHzQh-2uAaaXROj2dSNWYpwFz6oHRQYKsQ=";
      }
    } else {
      // Imagen predeterminada si no hay actividad.
      return "https://media.istockphoto.com/id/1322158059/es/foto/mancuerna-botella-de-agua-toalla-en-el-banco-en-el-gimnasio.jpg?s=612x612&w=0&k=20&c=6wc4q5s37IHzQh-2uAaaXROj2dSNWYpwFz6oHRQYKsQ=";
    }
  }
}

