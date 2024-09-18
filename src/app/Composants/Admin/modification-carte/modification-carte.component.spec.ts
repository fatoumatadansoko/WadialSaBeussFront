import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationCarteComponent } from './modification-carte.component';

describe('ModificationCarteComponent', () => {
  let component: ModificationCarteComponent;
  let fixture: ComponentFixture<ModificationCarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificationCarteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificationCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
