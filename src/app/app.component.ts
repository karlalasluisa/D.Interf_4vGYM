import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FunctionSelectorComponent } from './function-selector/function-selector.component';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
  
})
export class AppComponent {
  title = '4vGYMAppDI';
}
