import { Component, Input } from '@angular/core';
import { Activity } from '../../../../models/Activity';
import { MonitorSimpleComponent } from '../monitor-simple/monitor-simple.component';
import { CommonModule  } from '@angular/common';


@Component({
  selector: 'app-activity',
  imports: [MonitorSimpleComponent, CommonModule ],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {
 @Input() activity! : Activity | null;

 getImagUrl() { //depende de id tipo
    return 'https://via.placeholder.com/150';
  }

  isNull() {
    return this.activity == null;
  }
}
