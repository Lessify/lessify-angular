import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SpaceConfig} from '../core.module';
import {BaseService} from '../base.service';
import {Observable} from 'rxjs';
import {LessifyConfiguration} from './configuration-v1.service';

export interface LessifyTranslation {
  [key: string]: string | { [key: string]: string };
}

@Injectable({
  providedIn: 'root'
})
export class TranslationV1Service extends BaseService {

  constructor(
      readonly httpClient: HttpClient,
      readonly config: SpaceConfig
  ) {
    super(config);
  }

  /**
   * get Translation, possible values:
   * - 'default': provide default values
   * - locale: specific locale id from space
   * - 'all': in one call you will receive all locales in next format
   * {
   *   'en': {
   *     'key1': 'value1'
   *   },
   *   'de': {
   *     'key1': 'value1'
   *   }
   * }
   */
  get(locale: string = 'default'): Observable<LessifyConfiguration> {
    return this.httpClient.get<LessifyConfiguration>(
        `${this.getRootUrl()}/v1/spaces/${this.config.spaceId}/environments/${this.config.environment}/translations.${locale}.json`,
        {
          headers: this.getHeaders()
        }
    );
  }
}
