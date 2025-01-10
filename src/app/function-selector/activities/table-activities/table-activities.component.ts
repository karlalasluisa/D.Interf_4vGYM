import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Activity } from '../../../models/Activity';
import { AcivityServiceService } from '../../../Services/acivity-service.service';
import { ActivityComponent } from './activity/activity.component'

@Component({
  selector: 'app-table-activities',
  imports: [ActivityComponent],
  templateUrl: './table-activities.component.html',
  styleUrl: './table-activities.component.scss'
})
export class TableActivitiesComponent implements OnChanges{
  @Output() dateChange = new EventEmitter<Date>();
  @Input() date: Date = new Date();
  activitiesSubs: Subscription= new Subscription;
  activities : Activity[]=[];

  activity1:Activity|null = null; //inicia las 3 actividades a NULL
  activity2:Activity|null = null;
  activity3:Activity|null = null;

  constructor(private service: AcivityServiceService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['date'] && !changes['date'].firstChange) {
      this.date=changes['date'].currentValue;
      this.ngOnInit();
    }
  }

  ngOnInit(): void {
    // Suscríbete para recoger las actividades
    this.activitiesSubs = this.service.getActivitiesByDate(this.date).subscribe({
      next: (data) => {
        this.activities = data; // Asigna las actividades filtradas
      },
      error: (err) => {
        console.error('Error fetching activities:', err);
      },
    });

    this.setActivities();
  }

  ngOnDestroy(): void {
    // Cancela la suscripción para evitar fugas de memoria
    if (this.activitiesSubs) {
      this.activitiesSubs.unsubscribe();
    }
  }

  setActivities(){
    this.activities.forEach(activity=>{
      console.log()
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

  nextDay(){
    this.date.setDate(this.date.getDate() + 1);
    this.dateChange.emit(this.date);
  }

  previousDay(){
    this.date.setDate(this.date.getDate() - 1);
    this.dateChange.emit(this.date);
  }

}
