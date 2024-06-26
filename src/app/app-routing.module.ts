import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/users/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/users/registro/registro.component';
import { SolicitudesComponent } from './pages/users/solicitudes/solicitudes.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'solicitudes', component: SolicitudesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
