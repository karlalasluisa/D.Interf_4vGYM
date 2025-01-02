import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-function-selector',
  standalone: true, // Esto indica que es un componente independiente
  imports: [],
  templateUrl: './function-selector.component.html',
  styleUrl: './function-selector.component.scss'
})
export class FunctionSelectorComponent {
  @Output() viewChanged = new EventEmitter<string>();
  currentView: string = 'activities'; // Default view

  selectView(view: string): void {
    this.currentView = view;
    this.viewChanged.emit(view); // Emit the selected view to the parent
  }
}
