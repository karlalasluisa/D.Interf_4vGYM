import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { Monitor } from '../../../../../../../models/Monitor';
import { Activity } from '../../../../../../../models/Activity';
import { TypeActivity } from '../../../../../../../models/TypeActivity';
import { AcivityServiceService } from '../../../../../../../Services/acivity-service.service';
import { AcivityTypeServiceService } from '../../../../../../../Services/acivity-type-service.service';
import { MonitorsServiceService } from '../../../../../../../Services/monitors-service.service';
import { WindowServiceService } from '../../../../../../../Services/window-service.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { DateServiceService } from '../../../../../../../Services/date-service.service';
import _ from 'lodash';
import { waitForAsync } from '@angular/core/testing';


@Component({
  selector: 'app-create-activity',
  imports: [CommonModule],
  templateUrl: './create-activity.component.html',
  styleUrl: './create-activity.component.scss'
})
export class CreateActivityComponent {
  @Output() guardado = new EventEmitter<void>(); // Define un EventEmitter que se emite cuando se guarda la actividad

  activity!: Activity;
  date!: Date;

  //complementos de la actividad:
  monitorsNew: (Monitor | null)[] = [];
  activityTypeNew: TypeActivity | null = null;

  //colecciones para que salgan en el cbo
  activityTypes: TypeActivity[] = [];
  monitors: Monitor[] = [];
  rangeNumers: number[] = []; //renago de index en cbo de la lista de monitores

  //variable auxiliares:
  indexHour: number = -1;
  indexAuxiliar: number = -1;
  monitorAuxiliar!: Monitor | null;
  isValid: boolean = true;
  message: string = "";
  viewMonitor: Monitor | null = null;




  constructor(private dateService: DateServiceService, private cdr: ChangeDetectorRef, private activitiesService: AcivityServiceService, private typeService: AcivityTypeServiceService, private monitorService: MonitorsServiceService, private windowService: WindowServiceService) {
    this.windowService.index$.subscribe(data => this.indexHour = data); //recibe el index de la hora de la actividad
    this.setTypes(); // Generamos la lista de tipos

    this.getMonitors();
    this.dateService.dateChanges$.subscribe((newDate: Date) => this.date = newDate); // para saber que dia se esta creando la actiidad
  }




  //CONTROL SOBRE EL CBO DE TIPOS Y ACTIVITYTYPES ////////////////////////////////////////////////////////


  async onActivityTypeChange(event: Event) { // cuando cambia de tipo de actividad, si habia una seleccionada pregunta si estas seguro y lo guarda actualizando lo que se necesita
    const oldType = this.activityTypeNew;
    if (this.activityTypeNew == null || window.confirm("Do you want to change your type of activity? Monitors that are left over from the list will be removed")) {
      const types = await firstValueFrom(this.typeService.getTypes());
      this.activityTypeNew = types.find((type) => type != undefined && type.id === parseInt((event.target as HTMLSelectElement).value)) || null;
      if (this.activityTypeNew != null) this.setRange(this.activityTypeNew.numberMonitors);
      this.updateMonitorsList();
    } else {
      (event.target as HTMLSelectElement).value = (oldType != null ? oldType.id : -1).toString();
    }
  }


  //acondicionadores
  updateMonitorsList() { //actualiza la lista de monitores:
                         //Si sobran monitores se eliminan
                         //Si faltan monitores se ponen a null
    if (this.activityTypeNew != null && this.activityTypeNew?.numberMonitors > this.monitorsNew.length) {
      const empty = this.activityTypeNew?.numberMonitors - this.monitorsNew.length // los que faltan
      for (let i = 0; i < empty; i++) {
        this.monitorsNew.push(null);
      }
    }
    else if (this.activityTypeNew != null) {//quita de la lista los que sobran
      this.monitorsNew = this.monitorsNew.slice(0, this.activityTypeNew.numberMonitors);

    }
  }

  setRange(n: number) { //genera el array de posiciones
    this.rangeNumers = [];
    for (let i = 0; i < n; i++) {
      this.rangeNumers.push(i);
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



  //CONTROL SOBRE EL CBO DE INDEX DE MONITOR E GUARDADO DE MONITORES ////////////////////////////////////////////////////////

  //auxiliar monitor tiene que coger valor en cuanto cambias o cambias de index

  onMonitorIndexChange(event: Event) { // si cambia de index de monitor:
    const selectElement = document.getElementById('monitor') as HTMLSelectElement; //el select de monitores (html)

    //Si el index es -1 es que se ha cambiado de monitor y se desea guardar
    if (this.indexAuxiliar != -1 &&  this.monitorAuxiliar != null && (this.monitorsNew[this.indexAuxiliar] == null || this.monitorAuxiliar?.id != this.monitorsNew[this.indexAuxiliar]?.id) && window.confirm(`Do you want to save the monitor ${this.monitorAuxiliar.name} in the position ${this.indexAuxiliar + 1}?`)) {
      const actualMonitor = _.cloneDeep(this.monitorsNew[this.indexAuxiliar]);
      if (this.containsIdMonitor(this.monitorAuxiliar.id) && actualMonitor?.id != this.monitorAuxiliar.id) {
        alert("The monitor is already assigned");
      } 
      else {
        this.monitorsNew[this.indexAuxiliar] = this.monitorAuxiliar;
      }
    } else if (this.indexAuxiliar != -1 && this.monitorAuxiliar == null && window.confirm(`Are you sure to store an empty monitor in the position ${this.indexAuxiliar + 1}?`)) {
      this.monitorsNew[this.indexAuxiliar] = null;
    }
    this.indexAuxiliar = parseInt((event.target as HTMLSelectElement).value);
    this.monitorAuxiliar = this.monitorsNew[this.indexAuxiliar];
    
    this.viewMonitor = this.monitorsNew[this.indexAuxiliar];
    if (!this.viewMonitor) selectElement.value = "-1"; //para que seleccione el default (o el monitor guardado o "select a monitor")
  }



  containsIdMonitor(id: number) { //para ver si el monitor ya esta en la actividad
    return this.monitorsNew.some(monitor => monitor != null && monitor.id === id);
  }

  //CONTROL SOBRE EL CBO DE  MONITORES ///////////////////////////////////////////////////////////////////////////////


  async onMonitorChange(event: Event) {//cuando cambias de monitor selecciionado recoge el monitor el el auxiliar
    this.monitorService.getMonitorById(parseInt((event.target as HTMLSelectElement).value)).subscribe(data => {
      this.monitorAuxiliar = data[0];

    })
    
  }

  closeOverlay() { //para cerrar el overlay
    this.windowService.clearButton();
  }

  onCancel($event: Event) { //para cancelar la creación
    $event.preventDefault();
    this.windowService.hide();
    this.closeOverlay();
  }

  getDates(){ //según el index de la hora devuelve la fecha
    var dateOut: Date=this.date;
    switch(this.indexHour){
      case 1:
        dateOut.setHours(10);
        dateOut.setMinutes(0);
        break;
      case 2:
        dateOut.setHours(13);
        dateOut.setMinutes(30);
        break;
      case 3:
        dateOut.setHours(17);
        dateOut.setMinutes(30);
        break;
    }

    return dateOut
  }

  isValidActivity(){ //valida la actividad y recoge los errores para sacarlos
    this.message = "";
    if (this.activityTypeNew==null){
      this.message+="You must asign a type of activity";
    }
    var count =0;
    this.monitorsNew.forEach(monitor => {
      count++;
      if (monitor==null){
        if (this.message=="") {
          this.message+="You must asign a monitor at the position ";
        }
        if (this.monitorsNew.length>count && this.monitorsNew[count-1]==null){
          this.message+= count + ", ";
        }
        else
        this.message+= count;
      }
    })
    if (this.indexHour>3 || this.indexHour<1){
      if (this.message!="") this.message+="\n";
      this.message+="You must asign a hour";
    }
    this.isValid = this.message == "";
    setTimeout(() => {
      this.isValid = true;    //cuando aparece la alerta, despues de 6 segundos se quita
    }, 6000);
    return this.message == ""; //devuelve un booleano que dice si es válida
  }

  closeAlert() { //cierra los alert
    this.isValid = true;
  }

  assambleActivity() { // con todas las variables montadas, monta la actividad
    if (this.isValidActivity()){
      var startDate: Date;
      startDate = this.getDates();
      var endDate: Date=  _.cloneDeep(startDate);
      endDate.setHours(startDate.getHours()+1);
      endDate.setMinutes(startDate.getMinutes()+30);
      if (this.activityTypeNew!=null)
      this.activity = new Activity(-1, startDate, endDate, this.monitorsNew.filter(monitor => monitor != null), this.activityTypeNew);
      return true;
    }
    return false
  }

  saveTheLast(){ // si el monitor no esta en la actividad y desea guardarlo lo guarda
    if (this.monitorAuxiliar != null && this.indexAuxiliar != -1 && !this.containsIdMonitor(this.monitorAuxiliar.id) && this.monitorAuxiliar.id != this.monitorsNew[this.indexAuxiliar]?.id && window.confirm("Do you want to save the monitor" + this.monitorAuxiliar.name +" at position "+ (this.indexAuxiliar + 1) + "?")) 
      this.monitorsNew[this.indexAuxiliar]=this.monitorAuxiliar; //si el monitor no esta en la actividad y desea guardarlo lo guarda
    else if (this.monitorAuxiliar?.id != this.monitorsNew[this.indexAuxiliar]?.id) alert("the monitor is already assigned");
  }

  


  onSubmit($event: Event) {// cuando envíes la actividad
    $event.preventDefault();
    this.saveTheLast();
    if (this.assambleActivity()){

      //guarda los datos y los updatea
      this.activitiesService.addActivity(this.activity).then(data => this.guardado.emit());
      this.windowService.setSaved();
      // this.activitiesService.notifyActivityChange(this.activity);
      this.windowService.hide();
      this.closeOverlay();
      
    }
    
  }

  isAtList(id: number) { // funcion que da color al select de monitores (esta en la actividad ya (rojo) y cuando no esta (verde))
    if ( this.monitorsNew.some(monitor => monitor!=null && monitor.id === id))return "#FF9A86"
    else return "#7CDC86"
  }
}