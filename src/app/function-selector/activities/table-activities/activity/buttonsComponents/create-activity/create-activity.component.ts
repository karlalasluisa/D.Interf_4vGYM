import { ChangeDetectorRef, Component } from '@angular/core';
import { Monitor } from '../../../../../../models/Monitor';
import { Activity } from '../../../../../../models/Activity';
import { TypeActivity } from '../../../../../../models/TypeActivity';
import { AcivityServiceService } from '../../../../../../Services/acivity-service.service';
import { AcivityTypeServiceService } from '../../../../../../Services/acivity-type-service.service';
import { MonitorsServiceService } from '../../../../../../Services/monitors-service.service';
import { WindowServiceService } from '../../../../../../Services/window-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-activity',
  imports: [CommonModule],
  templateUrl: './create-activity.component.html',
  styleUrl: './create-activity.component.scss'
})
export class CreateActivityComponent {
activity!: Activity;
  activityOld: Activity; //actividad que va a guardar el valor inicial de activity

  //colecciones para que salgan en el cbo
  activityTypes: TypeActivity[] = [];
  monitors: Monitor[] = [];
  rangeNumers: number[] = []; //renago de index en cbo de la lista de monitores

  //variable auxiliares:
  indexAuxiliar: number = -1;
  monitorAuxiliar!: Monitor;



  constructor(private cdr: ChangeDetectorRef,private activitiesService: AcivityServiceService, private typeService: AcivityTypeServiceService, private monitorService: MonitorsServiceService, private windowService: WindowServiceService) { 

    this.activitiesService.activityChanges$.subscribe(data => this.activity = data);
    this.activityOld = this.activity
    this.setTypes(); // Activamos la pantalla de carga

    //generamos todo ya que ya esta seleccionado:
    this.setRange(this.activity.activityType.numberMonitors);
    this.getMonitors();
    
  }

  //metodos para obtenes listas desde servicios
  setTypes() {
    this.typeService.getTypes().subscribe(data => {
      this.activityTypes = data; 
    });
  }

  getMonitors() {
    // Lógica para obtener los monitores
    this.monitorService.getMonitors().subscribe(data => {
      // Asignar los monitores a la variable
      this.monitors = data;
    })
  }


//CONTROL SOBRE EL CBO DE TIPOS Y ACTIVITYTYPES ////////////////////////////////////////////////////////


  onActivityTypeChange(event: Event) {
    if(parseInt((event.target as HTMLSelectElement).value)==this.activity.activityType.id) return; //si el id seleccionado el que ya es de por si no hace nada

    if (window.confirm(`¿Quieres cambiar de tipo de actividad? se elminirán monitores que sobren de la lista`)) {
      this.activity.activityType = this.activityTypes.filter(type => type.id == parseInt((event.target as HTMLSelectElement).value))[0];
      if (!this.updateMonitorsList()){
        (event.target as HTMLSelectElement).value = this.activityOld.activityType.id.toString();
        this.activity = this.activityOld;
      }
      this.setRange(this.activity.activityType.numberMonitors); 
    }
    else {
      (event.target as HTMLSelectElement).value = this.activity.activityType.id.toString();
    }
    
  }

  //acondicionadores
  updateMonitorsList(){
    if (this.activity.activityType.numberMonitors > this.activity.monitors.length) {
      const empty =this.activity.activityType.numberMonitors - this.activity.monitors.length // los que faltan
      const monitorsOutOfList: Monitor[]= this.getMonitorsRandom() //obtiene los monitores que no estan asignados a la actividad para que no se repitan
      if (empty <= monitorsOutOfList.length) {
        for (let i = 0; i < empty; i++) {
          this.activity.monitors.push(monitorsOutOfList[i]);
        }
      }
      else{
        alert("No hay suficientes monitores para este tipo de actividad. Va a volver al valor inicial: " + this.activityOld.activityType.name);
        
        return false;
      }
    }
    else{//quita de la lista los que sobran
      this.activity.monitors = this.activity.monitors.slice(this.activity.activityType.numberMonitors-1, this.activity.monitors.length-1);

    }
    return true
  }

  getMonitorsRandom():Monitor[] //obtiene lo monitores que no estan asignados a la actividad para que no se repitan
  {
    while (true) {
      const ranoms = this.monitors.filter(monitor => this.containsIdMonitor(monitor.id) == false);
      return ranoms;
    }
    
  }

  setRange(n: number) {
    this.rangeNumers = [];
    for (let i = 0; i < n; i++) {
      this.rangeNumers.push(i);
    }
  }


  
  //CONTROL SOBRE EL CBO DE INDEX DE MONITOR E GUARDADO DE MONITORES ////////////////////////////////////////////////////////
  
    //auxiliar monitor tiene que coger valor en cuanto cambias o cambias de index

  onMonitorIndexChange(event: Event){//utiliza los auxiliares para usar los valores anteriores al cambio si desea guardar

    if (this.indexAuxiliar != -1 && window.confirm(`¿Quieres guardar el monitor ` + this.monitorAuxiliar.name + ` en la posición ` + (this.indexAuxiliar + 1) + `?`) ) {
      const actualMonitor = this.activity.monitors[this.indexAuxiliar];
      
      if (this.containsIdMonitor(this.monitorAuxiliar.id) && actualMonitor.id != this.monitorAuxiliar.id) {
        alert("El monitor ya se encuentra en la actividad");
      }
      else {
        this.activity.monitors[this.indexAuxiliar] = this.monitorAuxiliar;
        alert("Guardado");
      }
    } 
    
    //guardar monitor actual (del nuevo index)
    this.indexAuxiliar = parseInt((event.target as HTMLSelectElement).value);
    this.monitorAuxiliar = this.activity.monitors[this.indexAuxiliar];
  }


containsIdMonitor(id: number) {
  return this.activity.monitors.some(monitor => monitor.id === id);
}

  //CONTROL SOBRE EL CBO DE  MONITORES ///////////////////////////////////////////////////////////////////////////////
  

  async onMonitorChange(event: Event) {
    this.monitorService.getMonitorById(parseInt((event.target as HTMLSelectElement).value)).subscribe(data => {
      this.monitorAuxiliar = data[0];
    })
    console.log(this.monitorAuxiliar);
  }




  closeOverlay() {
    this.windowService.clearButton();
  }

  onCancel($event: Event) {
    $event.preventDefault();
    this.windowService.hide();
    this.closeOverlay();
  }

  onSubmit($event: Event) {
    $event.preventDefault();
    
    //guarda los datos y los updatea
    this.activitiesService.updateActivity(this.activity)
    this.windowService.hide();
    this.closeOverlay();
  }
}
