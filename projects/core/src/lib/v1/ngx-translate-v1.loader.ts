import {TranslateLoader} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {TranslationV1Service} from './translation-v1.service';

export class LessifyTranslateV1HttpLoader implements TranslateLoader {
  constructor(
      private translationService: TranslationV1Service
  ) {
  }

  /**
   * Gets the translations from the server
   */
  public getTranslation(lang: string): Observable<any> {
    return this.translationService.get(lang);
  }
}
