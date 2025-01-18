import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Activity } from '../models/Activity';
import { TypeActivity } from '../models/TypeActivity';
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
  activity: Activity;

  constructor() {this.activity = new Activity(0, new Date(), new Date(), [], new TypeActivity(1,"", 3)); }
}
