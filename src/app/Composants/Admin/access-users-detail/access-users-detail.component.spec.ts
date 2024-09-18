import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessUsersDetailComponent } from './access-users-detail.component';

describe('AccessUsersDetailComponent', () => {
  let component: AccessUsersDetailComponent;
  let fixture: ComponentFixture<AccessUsersDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessUsersDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessUsersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
