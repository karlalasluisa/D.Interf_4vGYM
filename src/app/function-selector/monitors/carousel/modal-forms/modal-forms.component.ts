import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ModalService } from '../../../../../Services/modal.service';
import { Monitor } from '../../../../../models/Monitor';
import { CommonModule } from '@angular/common';
import { FormMonitorEditComponent } from '../form-monitor-edit/form-monitor-edit.component';
@Component({
  selector: 'app-modal-forms',
  imports: [CommonModule, FormMonitorEditComponent],
  templateUrl: './modal-forms.component.html',
  styleUrl: './modal-forms.component.scss',
  standalone: true
})
export class ModalFormsComponent {
  isCreating: boolean = false;
  monitorEdited: Monitor | null = null;
  constructor(private modalService: ModalService) {
  }
  
  ngOnInit(): void {
    this.modalService.monitorSelected$.subscribe((monitor) => {
      this.monitorEdited = monitor;
    })

  }
  close(): void{
    this.modalService.closeModal(); 
  }

}
