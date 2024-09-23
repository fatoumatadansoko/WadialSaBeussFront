import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieEvenementComponent } from './categorie-evenement.component';

describe('CategorieEvenementComponent', () => {
  let component: CategorieEvenementComponent;
  let fixture: ComponentFixture<CategorieEvenementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieEvenementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieEvenementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
