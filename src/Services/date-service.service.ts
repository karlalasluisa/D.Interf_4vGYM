import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

@Injectable({
  providedIn: 'root'
})
export class DateServiceService {

  private dateChangeSubject: ReplaySubject<Date> = new ReplaySubject(1);
    dateChanges$: Observable<Date> = this.dateChangeSubject.asObservable();
  
    notifyDateChange(newDate: Date): void {
      console.log("Fecha notificada desde el servicio: ", newDate);
      this.dateChangeSubject.next(newDate);
    }
}
