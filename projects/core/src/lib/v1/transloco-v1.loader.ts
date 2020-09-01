import {Observable} from 'rxjs';
import {TranslationV1Service} from './translation-v1.service';
import {Translation, TranslocoLoader} from '@ngneat/transloco';

export class LessifyTranslocoV1HttpLoader implements TranslocoLoader {
  constructor(
      private translationService: TranslationV1Service
  ) {
  }

  /**
   * Gets the translations from the server
   */
  public getTranslation(lang: string): Observable<Translation> {
    return this.translationService.get(lang);
  }
}
