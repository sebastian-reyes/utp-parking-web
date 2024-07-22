import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalSaeComponent } from './personal-sae.component';

describe('PersonalSaeComponent', () => {
  let component: PersonalSaeComponent;
  let fixture: ComponentFixture<PersonalSaeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalSaeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalSaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
