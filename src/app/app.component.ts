import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import {  RouterModule} from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [NavbarComponent, RouterModule], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,

})
export class AppComponent {
  title = '4vGYMAppDI';
  currentView: string = 'activities'; // Vista inicial

}
