import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelechargerinvitationComponent } from './telechargerinvitation.component';

describe('TelechargerinvitationComponent', () => {
  let component: TelechargerinvitationComponent;
  let fixture: ComponentFixture<TelechargerinvitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelechargerinvitationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelechargerinvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
