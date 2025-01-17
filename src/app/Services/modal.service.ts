import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Monitor } from '../models/Monitor';
@Injectable({
  providedIn: 'root'
})
export class ModalService {

//BehaviorSubject es una herramienta que permite emitir eventos
//permite que otros componentes escuchen cuándo abrir el modal de editar, con datos asociados.


  private openModelEditSource = new BehaviorSubject<Monitor|null>(null); 
  openModalEdit$ = this.openModelEditSource.asObservable();

  openEditModal(mon: Monitor) {
    this.openModelEditSource.next(mon); //
    this.openModalEdit$.subscribe((monitor) => {alert(monitor?.name)});
  }

  clearIndex() {
    this.openModelEditSource.next(null);
  }


}
