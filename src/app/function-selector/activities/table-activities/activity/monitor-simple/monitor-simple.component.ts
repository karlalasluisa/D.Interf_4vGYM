import { Component, Input } from '@angular/core';
import { Monitor } from '../../../../../../models/Monitor';
import { Activity } from '../../../../../../models/Activity';
@Component({
  selector: 'app-monitor-simple',
  imports: [],
  templateUrl: './monitor-simple.component.html',
  styleUrl: './monitor-simple.component.scss'
})
export class MonitorSimpleComponent {
  @Input() monitor!: Monitor;
  @Input() activity!: Activity;
  constructor() {}

  ngOnInit() {
    this.loadMonitorPhoto(this.monitor.photo);
  }

  async loadMonitorPhoto(url: string) { //si la imagen no existe, se carga la imagen por defecto y se le asigna al monitor
    const exists = await new Promise<boolean>((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });

    this.monitor.photo = exists
      ? url
      : 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png';
  }

  sendMail($event: Event) {
    const email = this.monitor.email;
    alert("Se va a enviar un gmail al correo: " + email);
    const subject = `Clase de ${this.activity.activityType.name} el día ${new Date(this.activity.startDate).getFullYear()} ${new Date(this.activity.startDate).getFullYear()}/${new Date(this.activity.startDate).getMonth()}/${new Date(this.activity.startDate).getDate()} a la/s ${new Date(this.activity.startDate).getHours()}:${new Date(this.activity.startDate).getMinutes()}`;
    const body = `Buenas Sr/Sra ${this.monitor.name}:\n\nEstoy interesado en la clase de...`;
    
    // Construimos la URL de Gmail para abrir la redacción del correo
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Redirigimos a la URL de Gmail
    window.open(gmailUrl, '_blank');  // Abre en una nueva ventana o pestaña
  }
}
