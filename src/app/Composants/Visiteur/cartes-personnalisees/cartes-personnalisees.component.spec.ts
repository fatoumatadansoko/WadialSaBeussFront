import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartesPersonnaliseesComponent } from './cartes-personnalisees.component';

describe('CartesPersonnaliseesComponent', () => {
  let component: CartesPersonnaliseesComponent;
  let fixture: ComponentFixture<CartesPersonnaliseesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartesPersonnaliseesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartesPersonnaliseesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
