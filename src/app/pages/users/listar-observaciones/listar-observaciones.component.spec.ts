import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarObservacionesComponent } from './listar-observaciones.component';

describe('ListarObservacionesComponent', () => {
  let component: ListarObservacionesComponent;
  let fixture: ComponentFixture<ListarObservacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarObservacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarObservacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
