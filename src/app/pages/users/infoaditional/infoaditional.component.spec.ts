import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoaditionalComponent } from './infoaditional.component';

describe('InfoaditionalComponent', () => {
  let component: InfoaditionalComponent;
  let fixture: ComponentFixture<InfoaditionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoaditionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoaditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
