import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteAdminComponent } from './carte-admin.component';

describe('CarteAdminComponent', () => {
  let component: CarteAdminComponent;
  let fixture: ComponentFixture<CarteAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarteAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
