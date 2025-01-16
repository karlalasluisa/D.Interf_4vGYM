import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class WindowServiceService {//este servicio nos permite mostrar y ocultar la ventana de edicion o creacion de actividades 
  //además facilitamos la comunicacion con el componente padre

  private display = new Subject<boolean>();
  display$ = this.display.asObservable();

  show() {
    this.display.next(true);
  }

  hide() {
    this.display.next(false);
  }

  private activitybuttonSource = new BehaviorSubject<string | null>(null);
  activityButton$ = this.activitybuttonSource.asObservable();

  setButton(button: string) {
    this.activitybuttonSource.next(button);
  }

  clearButton() {
    this.activitybuttonSource.next(null);
  }

  private index = new BehaviorSubject<number>(-1); // Cambiado a BehaviorSubject con un valor inicial
  index$ = this.index.asObservable();

  setIndex(index: number) {
    this.index.next(index);
  }

  clearIndex() {
    this.index.next(-1);
  }
}
