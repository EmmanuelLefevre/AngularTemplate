
import { UnfoundErrorComponent } from './unfound-error.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('UnfoundErrorComponent', () => {
  let component: UnfoundErrorComponent;
  let fixture: ComponentFixture<UnfoundErrorComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [UnfoundErrorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UnfoundErrorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
