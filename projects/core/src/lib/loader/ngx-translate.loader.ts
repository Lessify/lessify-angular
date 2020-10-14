import {TranslateLoader} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {TranslationService} from '../services/translation.service';

export class LessifyNgxTranslateHttpLoader implements TranslateLoader {
  constructor(
      private translationService: TranslationService
  ) {
  }

  /**
   * Gets the translations from the server
   */
  public getTranslation(lang: string): Observable<any> {
    return this.translationService.get(lang);
  }
}
