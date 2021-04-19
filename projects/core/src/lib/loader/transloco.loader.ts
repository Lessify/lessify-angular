import {Observable} from 'rxjs';
import {Translation, TranslocoLoader} from '@ngneat/transloco';
import {LessifyTranslationService} from '../services/translation.service';

export class LessifyTranslocoHttpLoader implements TranslocoLoader {
  constructor(
      private translationService: LessifyTranslationService
  ) {
  }

  /**
   * Gets the translations from the server
   */
  public getTranslation(lang: string): Observable<Translation> {
    return this.translationService.fetch(lang);
  }
}
