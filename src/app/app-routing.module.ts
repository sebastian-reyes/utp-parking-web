import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/users/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/users/registro/registro.component';
import { SolicitudesComponent } from './pages/users/solicitudes/solicitudes.component';
import { ObservacionesComponent } from './pages/users/observaciones/observaciones.component';
import { ListarObservacionesComponent } from './pages/users/listar-observaciones/listar-observaciones.component';
import { JefeSeguridadComponent } from './pages/users/jefe-seguridad/jefe-seguridad.component';
import { JefeSeguridadGuardarComponent } from './pages/users/jefe-seguridad-guardar/jefe-seguridad-guardar.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'solicitudes', component: SolicitudesComponent },
  { path: 'observaciones', component: ObservacionesComponent },
  { path: 'observaciones/listar', component: ListarObservacionesComponent },
  { path: 'seguridad/listar', component: JefeSeguridadComponent },
  { path: 'seguridad/registrar', component: JefeSeguridadGuardarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
