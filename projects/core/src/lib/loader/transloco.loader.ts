import {Observable} from 'rxjs';
import {Translation, TranslocoLoader} from '@ngneat/transloco';
import {TranslationService} from '../services/translation.service';

export class LessifyTranslocoHttpLoader implements TranslocoLoader {
  constructor(
      private translationService: TranslationService
  ) {
  }

  /**
   * Gets the translations from the server
   */
  public getTranslation(lang: string): Observable<Translation> {
    return this.translationService.get(lang);
  }
}
