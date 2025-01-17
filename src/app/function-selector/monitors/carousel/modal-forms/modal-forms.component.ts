import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { ModalService } from '../../../../Services/modal.service';
import { Monitor } from '../../../../models/Monitor';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-modal-forms',
  imports: [CommonModule],
  templateUrl: './modal-forms.component.html',
  styleUrl: './modal-forms.component.scss'
})
export class ModalFormsComponent {
  @Input() titulo: string = 'Editar Monitor';

  monitorEdited: Monitor | null = null;
  constructor(private modalService: ModalService) {
    this.modalService.openModalEdit$.subscribe((monitor) => {

      this.monitorEdited = monitor;
    })
    alert(this.monitorEdited=null);
  }

}
