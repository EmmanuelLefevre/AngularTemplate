import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnconnectedErrorComponent } from './unconnected-error.component';

describe('UnconnectedErrorComponent', () => {
  let component: UnconnectedErrorComponent;
  let fixture: ComponentFixture<UnconnectedErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnconnectedErrorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UnconnectedErrorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
