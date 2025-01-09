import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Activity } from '../models/Activity';

@Injectable({
  providedIn: 'root'
})
export class AcivityServiceService {

  constructor(private http: HttpClient) { }

  getActivities() :Observable<Activity[]>
  {
    return this.http.get<Activity[]>('http://localhost:8080/activities'); 
  }

  getActivitiesByDate(date: Date) {
    var activities = this.getActivities().subscribe(data => {
      data.forEach(activity => {
        if (activity.date == date) {
          return activity;
        }
      });
    })
    return activities; 
  }

  updateActivity(activity: Activity) { 
    return this.http.put<Activity>('http://localhost:8080/activities/' + activity.id, activity).subscribe();
  }

  deleteActivity(id: number) {
    return this.http.delete<Activity>('http://localhost:8080/activities/' + id).subscribe();
  }

  addActivity(activity: Activity) {
    return this.http.post<Activity>('http://localhost:8080/activities', activity).subscribe();
  }
}
