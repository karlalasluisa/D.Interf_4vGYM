import { Component, Input, input } from '@angular/core';
import { CarouselComponent } from "./carousel/carousel.component";


@Component({
  selector: 'app-monitors',
  imports: [CarouselComponent],
  templateUrl: './monitors.component.html',
  styleUrl: './monitors.component.scss',
  standalone: true

})
export class MonitorsComponent {
  
}
