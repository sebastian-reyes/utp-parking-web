import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JefeSeguridadGuardarComponent } from './jefe-seguridad-guardar.component';

describe('JefeSeguridadGuardarComponent', () => {
  let component: JefeSeguridadGuardarComponent;
  let fixture: ComponentFixture<JefeSeguridadGuardarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JefeSeguridadGuardarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JefeSeguridadGuardarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
