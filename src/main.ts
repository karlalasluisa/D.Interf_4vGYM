import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { ActivitiesComponent } from './app/function-selector/activities/activities.component';
import { MonitorsComponent } from './app/function-selector/monitors/monitors.component';

// Configuración de las rutas de la aplicación
const routes: Routes = [
    { path: '', redirectTo: '/information-activities', pathMatch: 'full' }, // Ruta predeterminada
    { path: 'information-activities', component: ActivitiesComponent },
    { path: 'information-monitors', component: MonitorsComponent },
    { path: '**', redirectTo: '/information-activities' }, // Ruta no encontrada
];

// Inicializar la aplicación con configuración y rutas
bootstrapApplication(AppComponent, {
    ...appConfig, // Mantener la configuración existente
    providers: [
        provideRouter(routes), // Proveer el enrutador con las rutas
        ...(appConfig.providers || []), // Combinar con otros proveedores existentes
    ],
}).catch((err) => console.error(err));
