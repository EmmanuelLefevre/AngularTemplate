import { Directive, ElementRef, Input, OnInit, DestroyRef, inject } from '@angular/core';

const DEFAULT_TYPE_SPEED = 40;
const INITIAL_DELAY = 500;

@Directive({
  selector: '[typeWriter]',
  standalone: true
})

export class TypeWriterDirective implements OnInit {

  @Input('typeWriter') typeSpeed: number = DEFAULT_TYPE_SPEED;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly timeoutIds: ReturnType<typeof setTimeout>[] = [];

  ngOnInit(): void {
    const element = this.el.nativeElement;

    const textToType = element.textContent?.trim() || '';
    element.textContent = '';

    if (!textToType) return;

    let currentIndex = 0;

    const typeCharacter = (): void => {
      if (currentIndex < textToType.length) {
        element.textContent += textToType.charAt(currentIndex);
        currentIndex++;

        const timeoutId = setTimeout(typeCharacter, this.typeSpeed);
        this.timeoutIds.push(timeoutId);
      }
      else {
        element.classList.add('typing-finished');
      }
    };

    const initialTimeout = setTimeout(typeCharacter, INITIAL_DELAY);
    this.timeoutIds.push(initialTimeout);

    this.destroyRef.onDestroy((): void => {
      this.timeoutIds.forEach((id) => clearTimeout(id));
    });
  }
}
