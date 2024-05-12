import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
})
export class SliderComponent implements OnInit {
  userLoginOn: boolean = false;
  public rol: any;
  public nombre: string = '';
  public apellido: string = '';
  public codigo: string = '';
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      },
    });
    this.rol = this.loginService.role;
    this.nombre = this.loginService.nombres.split(' ')[0];
    this.apellido = this.loginService.apellidos.split(' ')[0];
    this.codigo = this.loginService.codigo;
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
