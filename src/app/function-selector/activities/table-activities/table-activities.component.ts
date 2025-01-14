import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Activity } from '../../../models/Activity';
import { AcivityServiceService } from '../../../Services/acivity-service.service';
import { ActivityComponent } from './activity/activity.component'
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DateServiceService } from '../../../Services/date-service.service';
import { EditActivityComponent } from "./activity/buttonsComponents/edit-activity/edit-activity.component";
import { WindowServiceService } from '../../../Services/window-service.service';
import { CreateActivityComponent } from './activity/buttonsComponents/create-activity/create-activity.component';

@Component({
  selector: 'app-table-activities',
  imports: [ActivityComponent, CommonModule, MatProgressSpinnerModule, EditActivityComponent, CreateActivityComponent],
  templateUrl: './table-activities.component.html',
  styleUrl: './table-activities.component.scss'
})
export class TableActivitiesComponent implements OnChanges{
  @Input() date: Date = new Date();
  activitiesSubs: Subscription= new Subscription;
  activities : Activity[]=[];

  isLoading = false; // Bandera para mostrar el bocadillo de carga

  activity1:Activity|null = null; //inicia las 3 actividades a NULL
  activity2:Activity|null = null;
  activity3:Activity|null = null;

  isOverlayVisible = false;
  button: string = '';
  
  constructor(private windowService: WindowServiceService, private service: AcivityServiceService, private dateService: DateServiceService) {
    this.windowService.display$.subscribe((visible) => {
      this.isOverlayVisible = visible;
    });

    this.windowService.activityButton$.subscribe((button) => {
      if (button) {
        this.button = button;
      }
    });
  }

  openOverlay($event: Event) {
    $event.preventDefault();
    this.isOverlayVisible=true;
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['date'] && !changes['date'].firstChange) {
      this.date=changes['date'].currentValue;
      this.fetchActivities();
    }
  }

  ngOnInit(): void {
    this.fetchActivities();
  }

  fetchActivities(): void {
    this.isLoading = true; // Activar la bandera de carga

    if (this.activitiesSubs) {
      this.activitiesSubs.unsubscribe();
    }

    this.activitiesSubs = this.service.getActivitiesByDate(this.date).subscribe({
      next: (data) => {
        this.activities = data;
        this.setActivities();
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
    this.activity1 = null;
    this.activity2 = null;
    this.activity3 = null;

    this.activities.forEach(activity=>{
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

  nextDay($event: Event){
    $event.preventDefault()
    this.date.setDate(this.date.getDate() + 1);
    this.dateService.notifyDateChange(new Date(this.date)); // Notificar fecha anterior
  }

  previousDay($event: Event){
    $event.preventDefault()
    this.date.setDate(this.date.getDate() - 1);
    this.dateService.notifyDateChange(new Date(this.date)); // Notificar fecha anterior
  }

}
