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
  @Input() index!: number; //index de la actividad para saber en que hora se encuentra independientemente de que la actividad sea null
  @Input() activity!: Activity | null; //la actividad que se va a mostrar (null si no hay actividad)

  //variables auxiliares
  indexAuxiliar: number = -1; //varible auxiliar para saber la posicion de la actividad en el array en las actividades de la fecha
  activitySubscription!: Subscription;

  constructor(private windowService: WindowServiceService, private activityService: AcivityServiceService) {

  }

  openOverlay($event: Event, button: string) {
    // Cancelar la suscripción previa si existe
    if (this.activitySubscription) {
      this.activitySubscription.unsubscribe();
    }
  
    $event.preventDefault();

   

    // Mostrar la ventana correspondiente
    this.windowService.show();
    this.windowService.setButton(button);
  
    // Lógica para creación
    if (button === 'create') {
      this.activity = null;
      this.activityService.notifyActivityChange(this.activity); // Notificar la actividad actual

      this.windowService.setIndex(this.index); // Indicar el índice seleccionado
    }
  
    // // Lógica para edición
    if (this.activity != null && button === 'edit') 
      {
      this.activityService.notifyActivityChange(this.activity); // Notificar la actividad actual
    }
  
    // Actualizar índice auxiliar
  
    this.windowService.index$.subscribe(data => this.indexAuxiliar = data);

  
    if (this.indexAuxiliar !== -1 && this.indexAuxiliar === this.index) {
      let act: Activity | null = null;
  
      // Suscribirse solo una vez a `activityChanges$`
      this.activityService.activityChanges$
        .pipe(take(1)) // Escucha solo la primera emisión
        .subscribe(activity => {
          act = activity;
          this.activity = _.cloneDeep(act); // Actualizar la actividad con la nueva
        });
    }


  }


  onDeleteActivity($event: Event) {
    $event.preventDefault();

    if (window.confirm(`¿Estas segur@ que quieres borrar la actividad?`)) {

      if (this.activity != null) {
        this.activityService.deleteActivity(this.activity?.id)
        this.activity = null;
        this.activityService.notifyActivityChange(null);
      }
    }

  }


  getImagUrl() { //depende de id tipo
    if (this.activity != null) {
      switch (this.activity.activityType.id) {
        case 1:
          return "https://media.istockphoto.com/id/500130316/es/foto/mujer-cauc%C3%A1sica-practicar-yoga-en-seashore.jpg?s=612x612&w=0&k=20&c=oGQV3_eiNx8qq6xX8brq2U-UalIsw3vVamJrVRl6eUQ="
        case 2:
          return "https://cuidateplus.marca.com/sites/default/files/styles/ratio_1_1/public/cms/2022-12/running-consejos-principiantes.jpg.webp?itok=0TWe3frA"
        default:
          return "https://media.istockphoto.com/id/1322158059/es/foto/mancuerna-botella-de-agua-toalla-en-el-banco-en-el-gimnasio.jpg?s=612x612&w=0&k=20&c=6wc4q5s37IHzQh-2uAaaXROj2dSNWYpwFz6oHRQYKsQ="
      }
    }
    else {
      return "https://media.istockphoto.com/id/1322158059/es/foto/mancuerna-botella-de-agua-toalla-en-el-banco-en-el-gimnasio.jpg?s=612x612&w=0&k=20&c=6wc4q5s37IHzQh-2uAaaXROj2dSNWYpwFz6oHRQYKsQ="
    }
  }


}
