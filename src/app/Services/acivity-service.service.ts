
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Activity } from '../models/Activity';
import { map } from 'rxjs/internal/operators/map';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AcivityServiceService {

  

  constructor(private http: HttpClient) { }

  getActivities() :Observable<Activity[]>
  {
    var a = this.http.get<Activity[]>('http://localhost:8000/activities'); 
    return a;
  }

  getActivitiesByDate(date: Date) {
    console.log(date);
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
