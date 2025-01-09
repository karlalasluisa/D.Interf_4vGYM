
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
    a.forEach(data => console.log(data.map(activity => new Date(activity.startDate).getDate())));
    return a;
  }

  getActivitiesByDate(date: Date) {
    console.log(date.getDate());
    return this.getActivities().pipe(
      map((data) =>
        data.filter((activity) => new Date(activity.startDate).getDate() === date.getDate(),
    ))
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
}
