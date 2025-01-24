
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Monitor } from '../models/Monitor';
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  //BehaviorSubject es una herramienta que permite emitir eventos
  //permite que otros componentes escuchen cuándo abrir el modal de editar, con datos asociados.

  private monitorSelected = new BehaviorSubject<Monitor | null>(null);
  monitorSelected$ = this.monitorSelected.asObservable();

  private isCreating = new BehaviorSubject<boolean>(false);
  isCreating$ = this.isCreating.asObservable();
  

  private monitorDeleted = new BehaviorSubject<number | null>(null);
  monitorDeleted$ = this.monitorDeleted.asObservable();

  deleteMonitor(monitor: Monitor): void {
    this.monitorDeleted.next(monitor.id);
  }


  editMonitor(monitor: Monitor): void {
    this.monitorSelected.next(monitor);
    this.isCreating.next(false);
  }

  createMonitor(): void {
    this.monitorSelected.next(null);
    this.isCreating.next(true); //creación
  }
 
  closeModal(): void {
    this.monitorSelected.next(null);
    this.isCreating.next(false);
  }
  notifyMonitorUpdated(monitor: Monitor): void {
    this.monitorSelected.next(monitor);
  }

}