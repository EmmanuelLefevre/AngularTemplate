import { By } from '@angular/platform-browser';
import { Component} from '@angular/core';
import { InputTrimDirective } from './input-trim.directive';

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [InputTrimDirective, FormsModule],
  template: '<input id="BASIC" inputTrim [(ngModel)]="value" (ngModelChange)="onOutputChange($event)" />'
})
class TestBasicComponent {
  value = '';
  onOutputChange = vi.fn();
}

@Component({
  standalone: true,
  imports: [InputTrimDirective, ReactiveFormsModule],
  template: '<input id="REACTIVE" inputTrim [formControl]="control" />'
})
class TestReactiveComponent {
  control = new FormControl('');
}

describe('InputTrimDirective', () => {

  describe('Basic Usage (without NgControl)', () => {

    let fixture: ComponentFixture<TestBasicComponent>;
    let component: TestBasicComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestBasicComponent, InputTrimDirective]
      }).compileComponents();

      fixture = TestBed.createComponent(TestBasicComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should trim value on focusout', () => {
      // --- ARRANGE ---
      const INPUT_EL = fixture.debugElement.query(By.css('#BASIC')).nativeElement as HTMLInputElement;
      INPUT_EL.value = '   angular   ';

      // --- ACT ---
      fixture.debugElement.query(By.css('#BASIC')).triggerEventHandler('focusout', null);

      // --- ASSERT ---
      expect(INPUT_EL.value).toBe('angular');
      expect(component.onOutputChange).toHaveBeenCalledWith('angular');
    });

    it('should NOT emit or change if value is already trimmed', () => {
      // --- ARRANGE ---
      const INPUT_EL = fixture.debugElement.query(By.css('#BASIC')).nativeElement as HTMLInputElement;
      INPUT_EL.value = 'clean';

      // --- ACT ---
      fixture.debugElement.query(By.css('#BASIC')).triggerEventHandler('focusout', null);

      // --- ASSERT ---
      expect(component.onOutputChange).not.toHaveBeenCalled();
    });
  });

  describe('Reactive Forms Usage', () => {
    let fixture: ComponentFixture<TestReactiveComponent>;
    let component: TestReactiveComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestReactiveComponent, InputTrimDirective]
      }).compileComponents();

      fixture = TestBed.createComponent(TestReactiveComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should update the FormControl value on focusout', () => {
      // --- ARRANGE ---
      const INPUT_EL = fixture.debugElement.query(By.css('#REACTIVE')).nativeElement as HTMLInputElement;
      INPUT_EL.value = '   reactive   ';

      // --- ACT ---
      fixture.debugElement.query(By.css('#REACTIVE')).triggerEventHandler('focusout', null);

      // --- ASSERT ---
      expect(component.control.value).toBe('reactive');
      expect(INPUT_EL.value).toBe('reactive');
    });
  });
});
