import { Injectable } from '@angular/core';
import { Monitor } from '../models/Monitor';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class MonitorsServiceService {

  constructor(private http: HttpClient) { }

  getMonitors(): Observable<Monitor[]> {
    return this.http.get<Monitor[]>('http://localhost:8000/monitors');
  }

  getMonitorById(id: number) {
    return this.getMonitors().pipe(
      map((data) =>
        data.filter((activity) => activity.id == id)
      )
    );
  }

  addMonitor(monitor: Monitor): Observable<Monitor> {
    return this.http.post<Monitor>('http://localhost:8000/monitors', monitor);
  }   

  deleteMonitor(id: number): Observable<void> {
    
    return this.http.delete<void>('http://localhost:8000/monitors/' + id);
  }

  updateMonitor(monitor: Monitor): Observable<Monitor> {
    return this.http.put<Monitor>('http://localhost:8000/monitors/' + monitor.id, monitor);
  }


}
