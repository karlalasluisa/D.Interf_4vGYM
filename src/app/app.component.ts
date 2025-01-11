import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [NavbarComponent, RouterOutlet, RouterLink, RouterLinkActive], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,

})
export class AppComponent {
  title = '4vGYMAppDI';
  currentView: string = 'activities'; // Vista inicial

}
