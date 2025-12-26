import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnfoundErrorComponent } from './unfound-error.component';

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
