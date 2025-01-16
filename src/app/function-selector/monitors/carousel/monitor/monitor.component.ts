import { Component,Input } from '@angular/core';
import { Monitor } from '../../../../../models/Monitor'; 
@Component({
  selector: 'app-monitor',
  imports: [],
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.scss',
  standalone: true,

})
export class MonitorComponent {
  @Input() monitor!: Monitor; // Recibe los datos del monitor
}
