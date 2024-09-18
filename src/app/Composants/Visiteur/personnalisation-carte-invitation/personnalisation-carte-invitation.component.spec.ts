import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnalisationCarteInvitationComponent } from './personnalisation-carte-invitation.component';

describe('PersonnalisationCarteInvitationComponent', () => {
  let component: PersonnalisationCarteInvitationComponent;
  let fixture: ComponentFixture<PersonnalisationCarteInvitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnalisationCarteInvitationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonnalisationCarteInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
