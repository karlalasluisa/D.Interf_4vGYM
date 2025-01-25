import { ChangeDetectorRef, Component } from '@angular/core';
import { AcivityTypeServiceService } from '../../../../../../../Services/acivity-type-service.service';
import { TypeActivity } from '../../../../../../../models/TypeActivity';
import { MonitorsServiceService } from '../../../../../../../Services/monitors-service.service';
import { Monitor } from '../../../../../../../models/Monitor';
import { Activity } from '../../../../../../../models/Activity';
import { WindowServiceService } from '../../../../../../../Services/window-service.service';
import { AcivityServiceService } from '../../../../../../../Services/acivity-service.service';
import { CommonModule } from '@angular/common';
import _ from 'lodash';

@Component({
  selector: 'app-edit-activity',
  imports: [CommonModule],
  templateUrl: './edit-activity.component.html',
  styleUrl: './edit-activity.component.scss',
})
export class EditActivityComponent {
  activity!: Activity|null; //actividad principal
  activityOld!: Activity; //actividad que va a guardar el valor inicial de activity

  //colecciones para que salgan en el cbo
  activityTypes: TypeActivity[] = [];
  monitors: Monitor[] = [];
  rangeNumers: number[] = []; //renago de index en cbo de la lista de monitores

  //variable auxiliares:
  indexAuxiliar: number = -1; 
  monitorAuxiliar!: Monitor;
  monitorView: Monitor | null = null; //monitor que se va a mostrar en la vista (default por cada index de monitor)


  constructor(private activitiesService: AcivityServiceService, private typeService: AcivityTypeServiceService, private monitorService: MonitorsServiceService, private windowService: WindowServiceService) { 

    this.activitiesService.activityChanges$.subscribe(data => this.activity = data);
    if (this.activity != null){
      this.activityOld = _.cloneDeep(this.activity); //para crear una copia de la actividad original sin referencias para cuando se cancele 
      
      //generamos todo ya que ya esta seleccionado:
      this.setTypes(); 
      this.setRange(this.activity.activityType.numberMonitors);
      this.getMonitors();
    }

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


  async onActivityTypeChange(event: Event) { // cuanco cambia de tipo de actividad
    if(parseInt((event.target as HTMLSelectElement).value)==this.activity?.activityType.id) return; //si el id seleccionado el que ya es de por si no hace nada
    
    //pregunta que si estas seguro ya que si lo cambias se perderan los monitores que sobren o se autocompletarán los que falten al azar sin repetirse
    if (window.confirm(`Do you want to change your type of activity? Monitors that are left over from the list will be removed`)) {
      
      //espera a que se termine la accion y luego actualiza la lista segun el tipo pasado => si es falso 
      if (await this.updateMonitorsList(this.activityTypes.filter(type => type.id == parseInt((event.target as HTMLSelectElement).value))[0])==false){
        //vuelve alos valores anteriores
        (event.target as HTMLSelectElement).value = this.activityOld.activityType.id.toString();
        this.activity = this.activityOld;
      }
      else if (this.activity != null){ //si se ha ajustado correctamente:
        //actualiza la actividad y los index
        this.activity.activityType = this.activityTypes.filter(type => type.id == parseInt((event.target as HTMLSelectElement).value))[0];
        this.setRange(this.activity.activityType.numberMonitors); 
      }
      
    }
    else if (this.activity != null){
      //si no quiere cambiar de tipo vuelve a los valores anteriores
      (event.target as HTMLSelectElement).value = this.activity.activityType.id.toString();
    }
    
  }

  //acondicionadores
  async updateMonitorsList(typeNew: TypeActivity){ //actualiza la lista de monitores
    
    if (this.activity != null && typeNew.numberMonitors > this.activity.monitors.length) { // si faltan monitores
      const empty =typeNew.numberMonitors - this.activity.monitors.length // los que faltan
      const monitorsOutOfList: Monitor[]= this.getMonitorsRandom() //obtiene los monitores que no estan asignados a la actividad para que no se repitan
      if (empty <= monitorsOutOfList.length) {
        for (let i = 0; i < empty; i++) {
          this.activity.monitors.push(monitorsOutOfList[i]);//los añade al azar
        }
      }
      else{ // si no hay monitores suficientes saca el error y no guarda nada
        alert("There are not enough monitors for this type of activity. It will return to the initial value: " + this.activityOld.activityType.name);
        
        return false;
      }
    }
    else if (this.activity != null){//quita de la lista los que sobran
      this.activity.monitors = this.activity.monitors.slice(typeNew.numberMonitors-1, this.activity.monitors.length-1);
    }
    return true
  }

  getMonitorsRandom():Monitor[] //obtiene lo monitores que no estan asignados a la actividad para que no se repitan
  {
    const ranoms = this.monitors.filter(monitor => this.containsIdMonitor(monitor.id) == false);
    return ranoms
  }

  setRange(n: number) {//genera el array de posiciones
    this.rangeNumers = [];
    for (let i = 0; i < n; i++) {
      this.rangeNumers.push(i);
    }
  }


  
  //CONTROL SOBRE EL CBO DE INDEX DE MONITOR E GUARDADO DE MONITORES ////////////////////////////////////////////////////////
  
    //auxiliar monitor tiene que coger valor en cuanto cambias o cambias de index

    //Realemente se usa para guardar el monitor anterior

  onMonitorIndexChange(event: Event){//utiliza los auxiliares para usar los valores anteriores al cambio si desea guardar
    const selectElement = document.getElementById('monitor') as HTMLSelectElement; //se instancia el select de monitores (html)

    //si el index es -1 es que se ha cambiado de monitor en cuanto al guardado, y se desea guardar
    if (this.indexAuxiliar != -1 && (this.activity?.monitors[this.indexAuxiliar] == null || this.monitorAuxiliar?.id != this.activity?.monitors[this.indexAuxiliar]?.id)&& window.confirm(`¿Quieres guardar el monitor ` + this.monitorAuxiliar.name + ` en la posición ` + (this.indexAuxiliar + 1) + `?`) ) {
      
      const actualMonitor = this.activity?.monitors[this.indexAuxiliar];//recoge el monitor actual en esa posición
      
      if (this.containsIdMonitor(this.monitorAuxiliar.id) && actualMonitor?.id != this.monitorAuxiliar.id) {
        alert("The monitor has already been assigned to another position");//ya a sido asignado el monitor en otra posicion
      }
      else if (this.activity != null){
        this.activity.monitors[this.indexAuxiliar] = this.monitorAuxiliar; //guardado
        alert("Saved");
      }
    } 
    
    //guardar monitor actual (del nuevo index)
    this.indexAuxiliar = parseInt((event.target as HTMLSelectElement).value);
    if (this.activity != null)
    this.monitorAuxiliar = this.activity.monitors[this.indexAuxiliar]; //se guarda como monitor auxiliar el monitor de esa posicion

    //muestra el monitor
    this.monitorView = _.cloneDeep(this.monitorAuxiliar); //copia el monitor sin referencias, el monitor que se manda a html
    selectElement.value = "-1";//selecciona el default
  }


  containsIdMonitor(id: number) { //contiene el monitor?
    return this.activity?.monitors.some(monitor => monitor.id === id);
  }

  //CONTROL SOBRE EL CBO DE  MONITORES ///////////////////////////////////////////////////////////////////////////////
  

  async onMonitorChange(event: Event) { //guarda en el monitor auxiliar el seleccionado
    this.monitorService.getMonitorById(parseInt((event.target as HTMLSelectElement).value)).subscribe(data => {
      this.monitorAuxiliar = data[0];
    })
  }


  saveTheLast(){ // si el monitor no esta en la actividad y desea guardarlo lo guarda
    if (this.activity != null && this.monitorAuxiliar != null && this.indexAuxiliar != -1 && !this.containsIdMonitor(this.monitorAuxiliar.id) && this.monitorAuxiliar.id != this.activity.monitors[this.indexAuxiliar].id && window.confirm(`Do you want to save the monitor ` + this.monitorAuxiliar.name + ` at the position ` + (this.indexAuxiliar + 1) + `?`)) 
    {
      this.activity.monitors[this.indexAuxiliar]=this.monitorAuxiliar; //si el monitor no esta en la actividad y desea guardarlo lo guarda

    }
    else if (this.monitorAuxiliar?.id != this.activity?.monitors[this.indexAuxiliar]?.id && this.containsIdMonitor(this.monitorAuxiliar.id)) alert("The monitor "+this.monitorAuxiliar.name+" is already assigned");

  }




  closeOverlay() {//para cerrar el overlay
    this.windowService.clearButton();
  }

  onCancel($event: Event) {//para cancelar la creación y dejar los valores del OLD (los iniciales)
    $event.preventDefault();
    
    if (this.activity != null) {
      this.activity.id = this.activityOld.id;
      this.activity.startDate = this.activityOld.startDate
      this.activity.endDate = this.activityOld.endDate
      this.activity.monitors = this.activityOld.monitors  
      this.activity.activityType = this.activityOld.activityType
    }
    this.windowService.hide();//cierra el overlay
    this.closeOverlay();
  }

  onSubmit($event: Event) {
    $event.preventDefault();
    
    //guarda los datos y los updatea
    this.saveTheLast();
    if (this.activity != null)
    this.activitiesService.updateActivity(this.activity)//guarda cambios en bbdd
    this.windowService.hide();//cierra el overlay
    this.closeOverlay();
  }

  isAtList(id: number) { // funcion que da color al select de monitores (esta en la actividad ya (rojo) y cuando no esta (verde))
    if ( this.activity?.monitors.some(monitor => monitor.id === id))return "#FF9A86"
    else return "#7CDC86"
  }
}


