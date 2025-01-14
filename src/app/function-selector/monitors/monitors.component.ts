import { Component, Input, input } from '@angular/core';
import { CarouselComponent } from "./carousel/carousel.component";
import { FormMonitorEditComponent } from './form-monitor-edit/form-monitor-edit.component';


@Component({
  selector: 'app-monitors',
  imports: [CarouselComponent,FormMonitorEditComponent],
  templateUrl: './monitors.component.html',
  styleUrl: './monitors.component.scss',
  standalone: true

})
export class MonitorsComponent {
  
}
