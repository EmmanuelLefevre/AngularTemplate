import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFooterComponent } from './main-footer.component';

describe('MainFooterComponent', () => {
  let component: MainFooterComponent;
  let fixture: ComponentFixture<MainFooterComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [MainFooterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MainFooterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
