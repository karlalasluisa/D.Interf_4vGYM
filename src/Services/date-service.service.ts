import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

@Injectable({
  providedIn: 'root'
})
export class DateServiceService {//servicio para facilitar la comunicacion entre los componentes 

          //Multidireccional: calendario --> actividades, actividades --> calendario

  private dateChangeSubject: ReplaySubject<Date> = new ReplaySubject(1);//fecha que se va a mostrar
    dateChanges$: Observable<Date> = this.dateChangeSubject.asObservable();
  
    notifyDateChange(newDate: Date): void {
      console.log("Fecha notificada desde el servicio: ", newDate);
      this.dateChangeSubject.next(newDate);
    }
}
