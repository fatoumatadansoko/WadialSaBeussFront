import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanEventComponent } from './plan-event.component';

describe('PlanEventComponent', () => {
  let component: PlanEventComponent;
  let fixture: ComponentFixture<PlanEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
