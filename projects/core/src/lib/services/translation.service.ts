import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseService} from './base.service';
import {LESSIFY_CONFIG, LessifyConfig} from '../lessify.config';

export interface Messages {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService extends BaseService {

  constructor(
      readonly httpClient: HttpClient,
      @Inject(LESSIFY_CONFIG) readonly config: LessifyConfig
  ) {
    super(config);
  }

  /**
   * get Translation, possible values:
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
  fetch(locale: string): Observable<Messages> {
    return this.httpClient.get<Messages>(
        `${this.getRootUrl()}/v1/spaces/${this.getSpace()}/environments/${this.getEnvironment()}/translations.${locale}.json`,
        {
          headers: this.getHeaders()
        }
    );
  }
}
