import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Activity } from '../../../../models/Activity';
import { AcivityServiceService } from '../../../../Services/acivity-service.service';
import { ActivityComponent } from './activity/activity.component'
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DateServiceService } from '../../../../Services/date-service.service';
import { EditActivityComponent } from "./activity/buttonsComponents/edit-activity/edit-activity.component";
import { WindowServiceService } from '../../../../Services/window-service.service';
import { CreateActivityComponent } from './activity/buttonsComponents/create-activity/create-activity.component';

@Component({
  selector: 'app-table-activities',
  imports: [ActivityComponent, CommonModule, MatProgressSpinnerModule, EditActivityComponent, CreateActivityComponent],
  templateUrl: './table-activities.component.html',
  styleUrl: './table-activities.component.scss'
})
export class TableActivitiesComponent implements OnChanges{
  @Input() date: Date = new Date();//la fecha que va a recibir para coger las actividades
  activitiesSubs: Subscription= new Subscription;
  activities : Activity[]=[];//las actividades que va a recibir

  isLoading = false; // Bandera para mostrar el bocadillo de carga

  activity1:Activity|null = null; //inicia las 3 actividades de el día a NULL
  activity2:Activity|null = null;
  activity3:Activity|null = null;

  //variables auxilares
  isOverlayVisible = false; // Bandera para mostrar el overlay (pantalla de edición o creación)
  button: string = ''; // Variable para almacenar el botón seleccionado =>('edit', 'create')
  
  constructor(private windowService: WindowServiceService, private service: AcivityServiceService, private dateService: DateServiceService) {
    this.windowService.display$.subscribe((visible) => {
      this.isOverlayVisible = visible;//recibe la variable del overlay para mortrar o no pantalla de edicion o creacion
    });

    this.windowService.activityButton$.subscribe((button) => {
      if (button) {
        this.button = button;//reibe el botón clicado
      }
    });

    //this.dateService.notifyDateChange(this.date); //TODO BORRAR
  }

  openOverlay($event: Event) { //función para abrir las pantallasede edi/cre
    $event.preventDefault();
    this.isOverlayVisible=true;
  }
  
  ngOnChanges(changes: SimpleChanges): void { //si detecta cambios en la fecha (mediante botones de anterior o siguiente día)
    if (changes['date'] && !changes['date'].firstChange) {
      this.date=changes['date'].currentValue;
      this.fetchActivities(); // Actualizar las actividades
    }
  }

  ngOnInit(): void {
    this.fetchActivities();
  }

  fetchActivities(): void {// Actualizar las actividades
    alert("takjata")
    this.isLoading = true; // Activar la bandera de carga --> He pensado en esta opción como una solución 
                           // al tiempo que tarda en hacer la petición get de actividades y de esta manera 
                           // no hay errores de sobre carga de peticiones o no parece que no funcione

    
    if (this.activitiesSubs) {
      this.activitiesSubs.unsubscribe();//si ya hay una subscripción la cancela
    }
    
    this.activitiesSubs = this.service.getActivitiesByDate(this.date).subscribe({//recibe las actividades por fecha
      next: (data) => {
        this.activities = data;//recibe las actividades
        this.setActivities(); //reparte las actividades en las 3 actividades según las horas
        this.isLoading = false; // Desactivar la bandera al terminar
      },
      error: (err) => {
        console.error('Error fetching activities:', err);
        this.isLoading = false; // Desactivar la bandera incluso en caso de error
      },
    });
  }

  ngOnDestroy(): void {
    // Cancela la suscripción para evitar fugas de memoria
    if (this.activitiesSubs) {
      this.activitiesSubs.unsubscribe();
    }
  }

  setActivities(){
    this.activity1 = null;//las inicia a null
    this.activity2 = null;
    this.activity3 = null;

    this.activities.forEach(activity=>{ //reparte las actividades en las 3 actividades según las horas
      const hours=new Date(activity.startDate).getHours()
      if (hours==10){
        this.activity1=activity;
      }
      else if (hours==13 && new Date(activity.startDate).getMinutes()==30){
        this.activity2=activity;
      }
      else if (hours==17 && new Date(activity.startDate).getMinutes()==30){
        this.activity3=activity;
      }
    });
  }

  //Funciones para cambiar de dia

  nextDay($event: Event){ 
    $event.preventDefault()
    this.date.setDate(this.date.getDate() + 1);
    this.dateService.notifyDateChange(new Date(this.date)); // Notificar fecha seguiente
  }

  previousDay($event: Event){
    $event.preventDefault()
    this.date.setDate(this.date.getDate() - 1);
    this.dateService.notifyDateChange(new Date(this.date)); // Notificar fecha anterior
  }

  

}
