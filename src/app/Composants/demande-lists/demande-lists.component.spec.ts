import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeListsComponent } from './demande-lists.component';

describe('DemandeListsComponent', () => {
  let component: DemandeListsComponent;
  let fixture: ComponentFixture<DemandeListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeListsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
