import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilPrestataireComponent } from './profil-prestataire.component';

describe('ProfilPrestataireComponent', () => {
  let component: ProfilPrestataireComponent;
  let fixture: ComponentFixture<ProfilPrestataireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilPrestataireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilPrestataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
