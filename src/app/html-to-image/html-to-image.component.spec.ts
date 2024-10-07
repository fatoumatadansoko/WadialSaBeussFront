import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlToImageComponent } from './html-to-image.component';

describe('HtmlToImageComponent', () => {
  let component: HtmlToImageComponent;
  let fixture: ComponentFixture<HtmlToImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HtmlToImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HtmlToImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
