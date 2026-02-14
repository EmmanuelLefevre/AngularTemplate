import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'language-toggle',
  imports: [
    TranslateModule,
    MatTooltipModule
  ],
  templateUrl: './language-toggle.component.html',
  styleUrls: ['./language-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LanguageToggleComponent {

  private readonly translate = inject(TranslateService);
  private readonly langEvent = toSignal(this.translate.onLangChange);

  public readonly currentLang = computed(() =>
    this.langEvent()?.lang ?? this.translate.getFallbackLang() ?? 'fr'
  );

  public readonly toggleState = computed(() => {
    const isFr = this.currentLang() === 'fr';

    return {
      code: isFr ? 'en' : 'fr',
      flagPath: `assets/icons/flags/${isFr ? 'en' : 'fr'}.png`,
      keys: {
        aria: 'UI.BUTTONS.LANGUAGE_TOGGLE.ARIA',
        tooltip: 'UI.BUTTONS.LANGUAGE_TOGGLE.TOOLTIP'
      }
    };
  });

  switchLanguage(lang: string): void {
    this.translate.use(lang);
  }
}
