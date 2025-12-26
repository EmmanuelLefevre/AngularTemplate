import { Component, inject, computed } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'language-toggle',
  imports: [
    TranslateModule
  ],
  templateUrl: './language-toggle.component.html',
  styleUrls: ['./language-toggle.component.scss']
})

export class LanguageToggleComponent {
  private readonly translate = inject(TranslateService);

  private readonly langEvent = toSignal(this.translate.onLangChange);

  public readonly currentLang = computed(() =>
    this.langEvent()?.lang ?? this.translate.getFallbackLang() ?? 'fr'
  );

  public switchLanguage(lang: string): void {
    this.translate.use(lang);
  }
}
