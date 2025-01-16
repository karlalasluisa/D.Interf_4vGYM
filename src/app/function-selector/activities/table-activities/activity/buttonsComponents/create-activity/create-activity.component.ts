import { ChangeDetectorRef, Component } from '@angular/core';
import { Monitor } from '../../../../../../models/Monitor';
import { Activity } from '../../../../../../models/Activity';
import { TypeActivity } from '../../../../../../models/TypeActivity';
import { AcivityServiceService } from '../../../../../../Services/acivity-service.service';
import { AcivityTypeServiceService } from '../../../../../../Services/acivity-type-service.service';
import { MonitorsServiceService } from '../../../../../../Services/monitors-service.service';
import { WindowServiceService } from '../../../../../../Services/window-service.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { DateServiceService } from '../../../../../../Services/date-service.service';
import _ from 'lodash';


@Component({
  selector: 'app-create-activity',
  imports: [CommonModule],
  templateUrl: './create-activity.component.html',
  styleUrl: './create-activity.component.scss'
})
export class CreateActivityComponent {
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
    this.setTypes(); // Activamos la pantalla de carga

    //generamos todo ya que ya esta seleccionado:
    this.getMonitors();
    this.dateService.dateChanges$.subscribe((newDate: Date) => this.date = newDate);
  }




  //CONTROL SOBRE EL CBO DE TIPOS Y ACTIVITYTYPES ////////////////////////////////////////////////////////


  async onActivityTypeChange(event: Event) {
    const oldType = this.activityTypeNew;
    if (this.activityTypeNew == null || window.confirm("¿Quieres cambiar de tipo de actividad? se elminirán monitores que sobren de la lista")) {
      const types = await firstValueFrom(this.typeService.getTypes());
      this.activityTypeNew = types.find((type) => type != undefined && type.id === parseInt((event.target as HTMLSelectElement).value)) || null;
      if (this.activityTypeNew != null) this.setRange(this.activityTypeNew.numberMonitors);
      await this.updateMonitorsList();
    } else {
      (event.target as HTMLSelectElement).value = (oldType != null ? oldType.id : -1).toString();
    }
  }


  //acondicionadores
  updateMonitorsList() {
    if (this.activityTypeNew != null && this.activityTypeNew?.numberMonitors > this.monitorsNew.length) {
      const empty = this.activityTypeNew?.numberMonitors - this.monitorsNew.length // los que faltan
      for (let i = 0; i < empty; i++) {
        this.monitorsNew.push(null);
      }
    }
    else if (this.activityTypeNew != null) {//quita de la lista los que sobran
      this.monitorsNew = this.monitorsNew.slice(this.activityTypeNew.numberMonitors-1, this.monitorsNew.length-1);
    }
  }

  setRange(n: number) {
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

  onMonitorIndexChange(event: Event) {
    const selectElement = document.getElementById('monitor') as HTMLSelectElement;

    alert()
    if (this.indexAuxiliar != -1 &&  this.monitorAuxiliar != null && (this.monitorsNew[this.indexAuxiliar] == null || this.monitorAuxiliar?.id != this.monitorsNew[this.indexAuxiliar]?.id) && window.confirm(`¿Quieres guardar el monitor ${this.monitorAuxiliar.name} en la posición ${this.indexAuxiliar + 1}?`)) {
      const actualMonitor = _.cloneDeep(this.monitorsNew[this.indexAuxiliar]);
      if (actualMonitor != null && this.containsIdMonitor(this.monitorAuxiliar.id) && actualMonitor.id != this.monitorAuxiliar.id) {
        alert("the monitor is already assigned");
      } else {
        this.monitorsNew[this.indexAuxiliar] = this.monitorAuxiliar;
      }
    } else if (this.indexAuxiliar != -1 && this.monitorAuxiliar == null && window.confirm(`Are you sure to store an empty monitor in the position ${this.indexAuxiliar + 1}?`)) {
      this.monitorsNew[this.indexAuxiliar] = null;
    }
    this.indexAuxiliar = parseInt((event.target as HTMLSelectElement).value);
    this.monitorAuxiliar = this.monitorsNew[this.indexAuxiliar];
    
    this.viewMonitor = this.monitorsNew[this.indexAuxiliar];
    if (!this.viewMonitor) selectElement.value = "-1";
  }



  containsIdMonitor(id: number) {
    return this.monitorsNew.some(monitor => monitor != null && monitor.id === id);
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

  getDates(){
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

  isValidActivity(){
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
      this.isValid = true;
    }, 6000);
    return this.message == "";
  }

  closeAlert() {
    this.isValid = true;
  }

  assambleActivity() {
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

  saveTheLast(){
    if (this.monitorAuxiliar != null && this.indexAuxiliar != -1 && !this.containsIdMonitor(this.monitorAuxiliar.id) && this.monitorAuxiliar.id != this.activity.monitors[this.indexAuxiliar].id && window.confirm(`¿Quieres guardar el monitor ` + this.monitorAuxiliar.name + ` en la posición ` + (this.indexAuxiliar + 1) + `?`)) 
      this.activity.monitors[this.indexAuxiliar]=this.monitorAuxiliar; //si el monitor no esta en la actividad y desea guardarlo lo guarda
  }

  onSubmit($event: Event) {
    $event.preventDefault();
    this.saveTheLast();
    if (this.assambleActivity()){

      //guarda los datos y los updatea
      
      this.activitiesService.addActivity(this.activity);
      this.activitiesService.notifyActivityChange(this.activity);
      this.windowService.hide();
      this.closeOverlay();
    }
    
  }
}
