import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FunctionSelectorComponent } from './function-selector/function-selector.component';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, FunctionSelectorComponent],
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
