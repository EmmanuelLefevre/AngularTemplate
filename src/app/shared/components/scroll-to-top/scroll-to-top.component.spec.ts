import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollToTopComponent } from './scroll-to-top.component';

describe('ScrollToTopComponent', () => {
  let component: ScrollToTopComponent;
  let fixture: ComponentFixture<ScrollToTopComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [ScrollToTopComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ScrollToTopComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
