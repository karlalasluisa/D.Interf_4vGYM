import { Component, ElementRef, Input, ViewChild } from '@angular/core';
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

  @ViewChild('monitorSelect', { static: false }) monitorSelect!: ElementRef<HTMLSelectElement>;

  activityTypes: TypeActivity[] = [];
  monitors: Monitor[] = [];
  rangeNumers: number[] = [];

  selectedActivityType: number | null = null;
  selectedMonitorIndex: number | null = null;
  selectedMonitorN: number | null = null;

  activityType: TypeActivity | null = null;
  monitor!: Monitor;

  activityId: number | null = null;
  private subscription!: Subscription;

  isLoading: boolean = true;

  constructor(private activitiesService: AcivityServiceService, private typeService: AcivityTypeServiceService, private monitorService: MonitorsServiceService, private windowService: WindowServiceService) { }


  closeOverlay() {
    this.windowService.clearActivityId();
    this.activityId = null;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit($event: Event) {
    $event.preventDefault();
    this.windowService.hide();
    this.closeOverlay();
  }/*this.activitiesService.getActivityById(this.activityId==null?-1:this.activityId).subscribe(data => {
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

              // Realizamos las operaciones que dependen de activity
              this.activityType = this.activity.activityType;
              this.setRange(this.activityType.numberMonitors);
              this.monitors = this.activity.monitors;
            }
          });

          // Desactivamos la pantalla de carga al terminar
          this.isLoading = false;
        });
      }
    );

    this.getTypes(); // Si es independiente, no afecta la carga
    this.rangeNumers = [];
  }

  getTypes() {
    this.typeService.getTypes().subscribe(data => {
      this.activityTypes = data; // Asignar los datos directamente
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
    if (window.confirm(`¿Quieres cambiar de tipo de actividad? se elminirán monitores que sobren de la lista`)) {
      this.activityTypes.forEach(type => {
        if (type.id == parseInt((event.target as HTMLSelectElement).value)) {
          this.activityType = type;
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
    this.monitorSelect.nativeElement.value = this.monitors[this.selectedMonitorIndex].id.toString();
    if (this.selectedMonitorN == null) console.log("por hacer validaciones")
    else {
      ;
      if (window.confirm(`¿Quieres guardar el monitor ` + this.monitor?.name + ` en la posición ` + this.selectedMonitorIndex + `?`)) {
        this.monitors[this.selectedMonitorIndex] = this.monitor;
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
}
