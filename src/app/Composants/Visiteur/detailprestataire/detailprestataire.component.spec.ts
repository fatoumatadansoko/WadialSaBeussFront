import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPrestataireComponent } from './detailprestataire.component';

describe('DetailPrestataireComponent', () => {
  let component: DetailPrestataireComponent;
  let fixture: ComponentFixture<DetailPrestataireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPrestataireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPrestataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
