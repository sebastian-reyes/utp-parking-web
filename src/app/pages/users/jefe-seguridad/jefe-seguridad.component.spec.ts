import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JefeSeguridadComponent } from './jefe-seguridad.component';

describe('JefeSeguridadComponent', () => {
  let component: JefeSeguridadComponent;
  let fixture: ComponentFixture<JefeSeguridadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JefeSeguridadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JefeSeguridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
