import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AcivityTypeServiceService } from '../../../../../../Services/acivity-type-service.service';
import { TypeActivity } from '../../../../../../models/TypeActivity';
import { CommonModule } from '@angular/common';
import { MonitorsServiceService } from '../../../../../../Services/monitors-service.service';
import { Monitor } from '../../../../../../models/Monitor';
import { Activity } from '../../../../../../models/Activity';
import { Subscription } from 'rxjs/internal/Subscription';
import { WindowServiceService } from '../../../../../../Services/window-service.service';
import { AcivityServiceService } from '../../../../../../Services/acivity-service.service';

@Component({
  selector: 'app-edit-activity',
  imports: [CommonModule],
  templateUrl: './edit-activity.component.html',
  styleUrl: './edit-activity.component.scss',
})
export class EditActivityComponent {
  @Input() activity!: Activity;

  @ViewChild('typeSelect', { static: false }) 
  typeSelect!: ElementRef<HTMLSelectElement>;

  activityTypes: TypeActivity[] = [];
  monitors: Monitor[] = [];
  monitorsAuxiliar: (Monitor|null)[] = [];
  rangeNumers: number[] = [];

  selectedActivityType: number | null = null;
  selectedMonitorIndex: number | null = null;
  selectedMonitorN: number | null = null;

  activityType: TypeActivity | null = null;
  monitor!: Monitor;
  activityOld: Activity;

  activityId: number | null = null;
  private subscription!: Subscription;

  isLoading: boolean = false;
  invalid: Boolean= false;
  constructor(private cdr: ChangeDetectorRef,private activitiesService: AcivityServiceService, private typeService: AcivityTypeServiceService, private monitorService: MonitorsServiceService, private windowService: WindowServiceService) { this.activityOld = this.activity; 
    
  }


  closeOverlay() {
    this.windowService.clearActivityId();
    this.activityId = null;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /*this.activitiesService.getActivityById(this.activityId==null?-1:this.activityId).subscribe(data => {
      this.activity = data[0];
    })*/
  ngOnInit() {
    
    this.isLoading = true; // Activamos la pantalla de carga
    
    this.subscription = this.windowService.activityId$.subscribe(
      (id) => {
        this.activityId = id;

        this.activitiesService.getActivities().subscribe(data => {
          data.forEach(element => {
            if (element.id == (this.activityId == null ? -1 : this.activityId) && this.activity == null) {
              this.activity = element;
              this.getTypes(); // Si es independiente, no afecta la carga
              this.monitorsAuxiliar = this.activity.monitors
              // Realizamos las operaciones que dependen de activity
              this.activityType = this.activity.activityType;
              
              this.setRange(this.activityType.numberMonitors);
              this.getMonitors();
              this.isLoading = false;
            }
          });

          
        });
      }
    );
    
    //this.rangeNumers = [];
  }

  ngAfterViewInit() {

    this.isLoading = true;
  }

  onLoadingComplete() {
    this.isLoading = false;
    this.cdr.detectChanges(); // Forzar la actualización del DOM
  }

  getTypes() {
    this.typeService.getTypes().subscribe(data => {
      this.activityTypes = data; // Asignar los datos directamente
      // Desactivamos la pantalla de carga al terminar
      this.typeSelect.nativeElement.value = this.activity.activityType.id.toString();
    });
  }

  getMonitors() {
    // Lógica para obtener los monitores
    this.monitorService.getMonitors().subscribe(data => {
      // Asignar los monitores a la variable
      this.monitors = data;
    })
  }

  setRange(n: number) {
    this.rangeNumers = [];
    for (let i = 0; i < n; i++) {
      this.rangeNumers.push(i);
    }
  }

  onActivityTypeChange(event: Event) {
    
    if (parseInt((event.target as HTMLSelectElement).value)==-1 || window.confirm(`¿Quieres cambiar de tipo de actividad? se elminirán monitores que sobren de la lista`)) {
      this.activityTypes.forEach(type => {
        if (type.id == this.activity.activityType.id) {
          this.activity.activityType = type;
          let count=0;
          this.monitorsAuxiliar = [];
          this.activity.monitors.forEach(monitor => {
            if (count < this.activity.activityType.numberMonitors) {
              this.monitorsAuxiliar.push(monitor);
              count++;
            }
          });
          const empty = this.activity.activityType.numberMonitors - this.monitorsAuxiliar.length
          for (let i = count; i < (empty>=0?empty:0); i++) {
            this.monitorsAuxiliar.push(null)
          }
          
        }
      });

      if (this.activityType != null) {
        this.setRange(this.activityType.numberMonitors);

      }
    } else {
      (event.target as HTMLSelectElement).value = this.activity.activityType.id.toString();
    }
  }

  onMonitorIndexChange(event: Event) {
    this.selectedMonitorIndex = parseInt((event.target as HTMLSelectElement).value);
    
    if (this.selectedMonitorN == null) console.log("por hacer validaciones")
    else {
      ;
      if (window.confirm(`¿Quieres guardar el monitor ` + this.monitor?.name + ` en la posición ` + (this.selectedMonitorIndex + 1) + `?`)) {
        
      } else {

      }
    }

    this.getMonitors();
  }

  onMonitorChange(event: Event) {
    this.selectedMonitorN = parseInt((event.target as HTMLSelectElement).value);
    this.monitorService.getMonitorById(this.selectedMonitorN).subscribe(data => {
      this.monitor = data[0];
    })
  }

  onCancel($event: Event) {
    $event.preventDefault();
    this.windowService.hide();
    this.closeOverlay();
  }

  onSubmit($event: Event) {
    $event.preventDefault();
    
    let count=0;
    this.monitorsAuxiliar.forEach((monitor)=>{
      if (monitor==null){
        this.invalid = true;
        return;
      }
      count++;
    })
    this.activity.monitors=this.monitorsAuxiliar.filter((monitor): monitor is Monitor => monitor !== null);
    this.activitiesService.updateActivity(this.activity)
    this.windowService.hide();
    this.closeOverlay();
    
  }

  onChargeTypes($event: Event) {
    $event.preventDefault();
    this.getTypes();
    ($event.target as HTMLSelectElement).value = this.activity.activityType.id.toString();
  }
}


