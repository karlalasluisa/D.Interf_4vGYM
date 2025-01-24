import { Component} from '@angular/core';
import { CarouselComponent } from "./carousel/carousel.component";
import { ModalFormsComponent } from "./carousel/modal-forms/modal-forms.component";


@Component({
  selector: 'app-monitors',
  imports: [CarouselComponent, ModalFormsComponent],
  templateUrl: './monitors.component.html',
  styleUrl: './monitors.component.scss',
  standalone: true

})
export class MonitorsComponent {
  
}
