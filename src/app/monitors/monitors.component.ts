import { Component } from '@angular/core';

@Component({
  selector: 'app-monitors',
  imports: [],
  standalone: true,
  templateUrl: './monitors.component.html',
  styleUrl: './monitors.component.scss'
})
export class MonitorsComponent {
  ngOnInit() {
    console.log('MonitorsComponent loaded');
  }
}
