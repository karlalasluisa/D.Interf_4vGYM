import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Monitor } from '../../../../../models/Monitor';
import { AbstractControl, FormsModule } from '@angular/forms';
import { ModalService } from '../../../../../Services/modal.service';
import { MonitorsServiceService } from '../../../../../Services/monitors-service.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms'; // Importar Reactive Forms
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-monitor',
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './form-monitor.component.html',
  styleUrls: ['./form-monitor.component.scss'],
  standalone: true
})
// Conponente para el formulario de monitores que puede ser de creación o de edición
export class FormMonitorComponent {
  @Input() monitor!: Monitor; // Recibe el monitor a editar
  @Output() cancel = new EventEmitter<void>(); // Emite cuando se cancela
  isCreating: boolean = false;

  // Definir el formulario
  monitorForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, this.customEmailValidator]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{9}$/)]),
    photo: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/),
    ]),
  });

  constructor(private modalService: ModalService, private monitorsService: MonitorsServiceService) { }

  ngOnInit() {
    // Suscribirse al estado de la modal
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

    // Si el formulario es válido, guardamos el monitor
    if (this.monitorForm.valid) {
      const monitorData = this.monitorForm.value as Monitor;

      // Si estamos editando, agregar el ID del monitor
      if (!this.isCreating && this.monitor && this.monitor.id) {
        monitorData.id = this.monitor.id;
      }

      if (this.isCreating) {
        // Crear monitor
        this.monitorsService.addMonitor(monitorData).subscribe((addMonitor) => {
          this.modalService.notifyMonitorUpdated(addMonitor);
          this.modalService.closeModal();
        });
      } else {    
        // Editar monitor
        this.monitorsService.updateMonitor(monitorData).subscribe((updatedMonitor) => {
          this.modalService.notifyMonitorUpdated(updatedMonitor);
          this.modalService.closeModal();
          
        });
      }
    } else {
      // Si el formulario tiene errores, mostrar alerta
      alert('El formulario contiene errores. Por favor, revisa los campos.');
    }
  }

  onCancel() {
    this.modalService.closeModal(); // Emitir evento de cancelación
  }

  // Validador personalizado para correo
  customEmailValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const valid = emailRegex.test(control.value || '');
    return valid ? null : { invalidEmail: true };
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

