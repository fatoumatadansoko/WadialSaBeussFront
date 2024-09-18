import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPrestataireComponent } from './dashboard-prestataire.component';

describe('DashboardPrestataireComponent', () => {
  let component: DashboardPrestataireComponent;
  let fixture: ComponentFixture<DashboardPrestataireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPrestataireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPrestataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
