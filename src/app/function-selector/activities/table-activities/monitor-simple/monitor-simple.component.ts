import { Component, Input } from '@angular/core';
import { Monitor } from './../../../../models/Monitor';
@Component({
  selector: 'app-monitor-simple',
  imports: [],
  templateUrl: './monitor-simple.component.html',
  styleUrl: './monitor-simple.component.scss'
})
export class MonitorSimpleComponent {
  @Input() monitor!: Monitor;

  constructor() {}

}
