
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Activity } from '../models/Activity';
import { map } from 'rxjs/internal/operators/map';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class AcivityServiceService {

  

  constructor(private http: HttpClient) {}


  getActivities() :Observable<Activity[]>
  {
    var a = this.http.get<Activity[]>('http://localhost:8000/activities'); 
    return a;
  }

  getActivitiesByDate(date: Date) {
    
    this.getActivities().pipe(
      map((data) =>
        console.log(data)
      )
    );
    return this.getActivities().pipe(
      map((data) =>
        data.filter((activity) =>this.dateCompare(new Date(activity.startDate), date))
      )
    );
    
  }

  getActivityById(id: number) {
    console.log(id + "es el id en servicio");
    if (id == null) return this.getActivities();
    return this.getActivities().pipe(
      tap((data) => console.log(data)), // Imprime los datos para verificar
      map((data) =>
        data.filter((activity) => activity.id === Number(id))
      )
      
    );
  }
  

  updateActivity(activity: Activity) { 
    return this.http.put<Activity>('http://localhost:8000/activities/' + activity.id, activity).subscribe();
  }

  deleteActivity(id: number) {
    return this.http.delete<Activity>('http://localhost:8000/activities/' + id).subscribe();
  }

  addActivity(activity: Activity) {
    return this.http.post<Activity>('http://localhost:8000/activities', activity).subscribe();
  }

  private dateCompare(date1: Date, date2: Date) { //para que solo se compruebe por fecha sin horas ni minutos
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);
    return date1.getTime() === date2.getTime();
  }
}
