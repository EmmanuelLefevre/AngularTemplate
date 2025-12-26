import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericErrorComponent } from './generic-error.component';

describe('GenericErrorComponent', () => {
  let component: GenericErrorComponent;
  let fixture: ComponentFixture<GenericErrorComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [GenericErrorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GenericErrorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
