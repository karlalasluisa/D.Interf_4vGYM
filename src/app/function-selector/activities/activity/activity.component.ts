import { Component } from '@angular/core';

@Component({
  selector: 'app-activity',
  imports: [],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {
  monitors: string[] = ['Monitor 1', 'Monitor 2', 'Monitor 3', 'Monitor 4', 'Monitor 5'];
  imageUrl: string = 'https://via.placeholder.com/150'; // Cambia esta URL por la de tu imagen

  onTopButtonClick() {
    console.log('Botón de arriba presionado');
    // Lógica adicional para el botón superior
  }

  onBottomButtonClick() {
    console.log('Botón de abajo presionado');
    // Lógica adicional para el botón inferior
  }
}
