import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class WindowServiceService {//este servicio nos permite mostrar y ocultar la ventana de edicion o creacion de actividades 
  //además facilitamos la comunicacion con el componente padre

  private saved = new Subject<boolean>(); //para mostrar y ocultar la ventana
  saved$ = this.saved.asObservable();

  setSaved() {
    this.saved.next(true);
  }

  setNotSaved() {
    this.saved.next(false);
  }

  private display = new Subject<boolean>(); //para mostrar y ocultar la ventana
  display$ = this.display.asObservable();

  show() {
    this.display.next(true);
  }

  hide() {
    this.display.next(false);
  }

  private activitybuttonSource = new BehaviorSubject<string | null>(null);//para mostrar y ocultar el boton de edicion o creacion
  activityButton$ = this.activitybuttonSource.asObservable();

  setButton(button: string) {
    this.activitybuttonSource.next(button);
  }

  clearButton() {
    this.activitybuttonSource.next(null);
  }

  private index = new BehaviorSubject<number>(-1); // Para saber cual de las 3 horas del día se esta editando
  index$ = this.index.asObservable();

  setIndex(index: number) {
    this.index.next(index);
  }

  clearIndex() {
    this.index.next(-1);
  }
}
