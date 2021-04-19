import {TranslateLoader} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {LessifyTranslationService} from '../services/translation.service';

export class LessifyNgxTranslateHttpLoader implements TranslateLoader {
  constructor(
      private translationService: LessifyTranslationService
  ) {
  }

  /**
   * Gets the translations from the server
   */
  public getTranslation(lang: string): Observable<any> {
    return this.translationService.fetch(lang);
  }
}
