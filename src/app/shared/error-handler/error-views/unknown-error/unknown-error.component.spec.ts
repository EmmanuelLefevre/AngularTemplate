import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnknownErrorComponent } from './unknown-error.component';

describe('UnknownErrorComponent', () => {
  let component: UnknownErrorComponent;
  let fixture: ComponentFixture<UnknownErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnknownErrorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UnknownErrorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
