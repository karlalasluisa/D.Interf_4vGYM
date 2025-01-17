import { Injectable } from '@angular/core';
import { Monitor } from '../models/Monitor';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MonitorsServiceService {

  constructor(private http: HttpClient) { }

  getMonitors() :Observable<Monitor[]>{
    return this.http.get<Monitor[]>('http://localhost:8000/monitors'); 
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

/*   Es mejor que el servicio devuelva un observable
  addMonitor(monitor: Monitor) {
    return this.http.post<Monitor>('http://localhost:8000/monitors', monitor).subscribe();
  }

  deleteMonitor(id: number) {
    return this.http.delete<Monitor>('http://localhost:8000/monitors/' + id).subscribe();
  }

  updateMonitor(monitor: Monitor) {
    return this.http.put<Monitor>('http://localhost:8000/monitors/' + monitor.id, monitor).subscribe();
  } */
}
