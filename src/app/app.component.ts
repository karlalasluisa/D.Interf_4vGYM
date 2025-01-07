import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { FunctionSelectorComponent } from './function-selector/function-selector.component';
import { ActivitiesComponent } from './function-selector/activities/activities.component';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, FunctionSelectorComponent, ActivitiesComponent], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '4vGYMAppDI';
  currentView: string = 'activities'; // Vista inicial

  updateView(view: string): void {
    this.currentView = view;
  }
}
