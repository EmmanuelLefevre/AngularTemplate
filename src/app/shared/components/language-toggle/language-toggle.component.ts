import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { map } from 'rxjs';

import { TranslationService } from '@app/core/_services/translation/translation.service';

@Component({
  selector: 'language-toggle',
  imports: [
    MatTooltipModule,
    TranslateModule
  ],
  templateUrl: './language-toggle.component.html',
  styleUrls: ['./language-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LanguageToggleComponent {

  private readonly translationService = inject(TranslationService);
  private readonly translate = inject(TranslateService);

  public readonly currentLang = toSignal(
    this.translate.onLangChange.pipe(map(event => event.lang)),
    { initialValue: this.translationService.getCurrentLang() }
  );

  public readonly toggleState = computed(() => {
    const current = this.currentLang();
    const isFr = current === 'fr';

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
    this.translationService.setLanguage(lang);
  }
}
