import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { User } from '../../../interface/user';
import { Sede } from '../../../interface/Sede';
import { SedesService } from '../../../services/sedes.service';

@Component({
  selector: 'app-carscard',
  templateUrl: './carscard.component.html',
  styleUrl: './carscard.component.css',
})
export class CarscardComponent implements OnInit {
  public sedes: Sede[] = [];
  userLoginOn: boolean = false;
  public rol: any;

  constructor(
    private loginService: LoginService,
    private sedeService: SedesService
  ) {}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      },
    });
    this.cargarSedes();
    this.rol = this.loginService.role;
  }

  cargarSedes(): void {
    this.sedeService.getSedes().subscribe((response) => {
      this.sedes = response;
    });
  }
}
