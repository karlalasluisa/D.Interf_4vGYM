import { Component, Input } from '@angular/core';
import { Activity } from '../../../../models/Activity';
import { MonitorSimpleComponent } from '../monitor-simple/monitor-simple.component';
import { CommonModule  } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { WindowServiceService } from '../../../../Services/window-service.service';
import { AcivityServiceService } from '../../../../Services/acivity-service.service';


@Component({
  selector: 'app-activity',
  imports: [CommonModule, MonitorSimpleComponent, MatDialogModule],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {
 @Input() activity! : Activity | null;
 constructor(private windowService: WindowServiceService, private activityService: AcivityServiceService) {}

 openOverlay($event: Event, button: string){ 
     $event.preventDefault();
     this.windowService.show();
     if (this.activity != null)
     this.windowService.setButton(button);
     $event.preventDefault();
     if (this.activity != null)
     this.activityService.notifyActivityChange(this.activity);
    else console.log("fue null");
    console.log("desde activity" + this.activity)
   }

 
   onDeleteActivity($event: Event){
    $event.preventDefault
    if (window.confirm(`¿Estas segur@ que quieres borrar la actividad?`)){
      if (this.activity)this.activityService.deleteActivity(this.activity?.id)
    }
   }
  

 getImagUrl() { //depende de id tipo
  if (this.activity != null) {
    switch (this.activity.activityType.id) {
      case 1:
        return "https://media.istockphoto.com/id/500130316/es/foto/mujer-cauc%C3%A1sica-practicar-yoga-en-seashore.jpg?s=612x612&w=0&k=20&c=oGQV3_eiNx8qq6xX8brq2U-UalIsw3vVamJrVRl6eUQ="
      case 2:
        return "https://cuidateplus.marca.com/sites/default/files/styles/ratio_1_1/public/cms/2022-12/running-consejos-principiantes.jpg.webp?itok=0TWe3frA"
      default:
        return "https://media.istockphoto.com/id/1322158059/es/foto/mancuerna-botella-de-agua-toalla-en-el-banco-en-el-gimnasio.jpg?s=612x612&w=0&k=20&c=6wc4q5s37IHzQh-2uAaaXROj2dSNWYpwFz6oHRQYKsQ="
    }
  }
  else {
    return "https://media.istockphoto.com/id/1322158059/es/foto/mancuerna-botella-de-agua-toalla-en-el-banco-en-el-gimnasio.jpg?s=612x612&w=0&k=20&c=6wc4q5s37IHzQh-2uAaaXROj2dSNWYpwFz6oHRQYKsQ="
  }
 }
  isNull() {
    return this.activity == null;
  }

}
