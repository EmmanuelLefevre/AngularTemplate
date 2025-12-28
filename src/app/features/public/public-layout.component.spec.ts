import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PublicLayoutComponent } from './public-layout.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('PublicLayoutComponent', () => {

  let component: PublicLayoutComponent;
  let fixture: ComponentFixture<PublicLayoutComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        PublicLayoutComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PublicLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
