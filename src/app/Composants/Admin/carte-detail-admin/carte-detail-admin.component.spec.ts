import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteDetailAdminComponent } from './carte-detail-admin.component';

describe('CarteDetailAdminComponent', () => {
  let component: CarteDetailAdminComponent;
  let fixture: ComponentFixture<CarteDetailAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarteDetailAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarteDetailAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
