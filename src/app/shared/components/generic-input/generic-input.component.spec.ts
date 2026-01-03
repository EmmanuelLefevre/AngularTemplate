import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericInputComponent } from './generic-input.component';

describe('GenericInputComponent', () => {

  let component: GenericInputComponent;
  let fixture: ComponentFixture<GenericInputComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [GenericInputComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GenericInputComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
