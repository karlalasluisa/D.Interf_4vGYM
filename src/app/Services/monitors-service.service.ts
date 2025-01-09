import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Monitor } from '../models/Monitor';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MonitorsServiceService {

  constructor(private http: HttpClient) { }

  getMonitors() :Observable<Monitor[]>{
    return this.http.get<Monitor[]>('http://localhost:8080/monitors'); 
  }

  addMonitor(monitor: Monitor) {
    return this.http.post<Monitor>('http://localhost:8080/monitors', monitor).subscribe();
  }

  deleteMonitor(id: number) {
    return this.http.delete<Monitor>('http://localhost:8080/monitors/' + id).subscribe();
  }

  updateMonitor(monitor: Monitor) {
    return this.http.put<Monitor>('http://localhost:8080/monitors/' + monitor.id, monitor).subscribe();
  }
}
