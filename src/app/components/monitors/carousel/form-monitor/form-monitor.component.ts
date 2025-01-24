import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Monitor } from '../../../../../models/Monitor';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../../../../Services/modal.service';
import { MonitorsServiceService } from '../../../../../Services/monitors-service.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms'; // Importar Reactive Forms
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-form-monitor',
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './form-monitor.component.html',
  styleUrl: './form-monitor.component.scss',
  standalone: true
})
export class FormMonitorComponent {
  @Input() monitor!: Monitor; // Recibe el monitor a editar
  @Output() cancel = new EventEmitter<void>(); // Emite cuando se cancela
  isCreating: boolean = false;

  // Definir el formulario
  monitorForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    photo: new FormControl('', Validators.required),
  });

  constructor(private modalService: ModalService, private monitorsService: MonitorsServiceService) { }

  ngOnInit() {
    this.modalService.isCreating$.subscribe((isCreating) => {
      this.isCreating = isCreating;

      // Si está creando, reiniciamos el formulario
      if (this.isCreating) {
        this.monitorForm.reset({
          name: '', email: '', phone: '', photo: ''
        });
      } else {
        // Si estamos editando, cargamos los datos
        this.monitorForm.patchValue({
          name: this.monitor.name,
          email: this.monitor.email,
          phone: this.monitor.phone,
          photo: this.monitor.photo,
        });
      }
    });
  }

  saveMonitor() {

    if (this.monitorForm.valid) {
      const monitorData = this.monitorForm.value as Monitor;

      // Si estamos editando, agregar el ID manualmente
      if (!this.isCreating && this.monitor && this.monitor.id) {
        monitorData.id = this.monitor.id;
      }

      if (this.isCreating) {
        this.monitorsService.addMonitor(monitorData).subscribe((addMonitor) => {
          this.modalService.notifyMonitorUpdated(addMonitor);
          this.modalService.closeModal();
        });
      } else {    
        this.monitorsService.updateMonitor(monitorData).subscribe((updatedMonitor) => {
          this.modalService.notifyMonitorUpdated(updatedMonitor);
          this.modalService.closeModal();
          
        });
      }
    } else {
      alert('El formulario contiene errores. Por favor, revisa los campos.');
    }
  }

  onCancel() {
    this.modalService.closeModal(); // Emitir evento de cancelación
  }
  // Getters para el acceso en el template
  get name() {
    return this.monitorForm.get('name');
  }

  get email() {
    return this.monitorForm.get('email');
  }

  get phone() {
    return this.monitorForm.get('phone');
  }

  get photo() {
    return this.monitorForm.get('photo');
  }

}
