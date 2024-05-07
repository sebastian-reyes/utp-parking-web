import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
})
export class SliderComponent implements AfterViewInit, OnInit {
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

  ngAfterViewInit(): void {
    const sidebar: HTMLElement | null = document.querySelector('.sidebar');
    const closeBtn: HTMLElement | null = document.querySelector('#btn');
    const searchBtn: HTMLElement | null = document.querySelector('.bx-search');

    closeBtn?.addEventListener('click', function () {
      sidebar?.classList.toggle('open');
      menuBtnChange();
    });

    searchBtn?.addEventListener('click', function () {
      sidebar?.classList.toggle('open');
      menuBtnChange();
    });

    function menuBtnChange(): void {
      if (sidebar?.classList.contains('open')) {
        closeBtn?.classList.replace('bx-menu', 'bx-menu-alt-right');
      } else {
        closeBtn?.classList.replace('bx-menu-alt-right', 'bx-menu');
      }
    }
  }
}
