import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteInvitationComponent } from './carte-invitation.component';

describe('CarteInvitationComponent', () => {
  let component: CarteInvitationComponent;
  let fixture: ComponentFixture<CarteInvitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarteInvitationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarteInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
