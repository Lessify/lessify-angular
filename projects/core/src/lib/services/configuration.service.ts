import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SpaceConfig} from '../core.module';
import {BaseService} from './base.service';

export interface Configurations {
  [key: string]: string | number | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService extends BaseService {
  constructor(
      readonly httpClient: HttpClient,
      readonly config: SpaceConfig
  ) {
    super(config);
  }

  /**
   * get Configurations
   * examples:
   * {
   *   "boolean": true,
   *   "date": "2020-02-20",
   *   "text": "any value",
   *   "number": 1
   * }
   */
  get<T>(): Observable<T>;
  /**
   * get Configurations
   * examples:
   * {
   *   "boolean": true,
   *   "date": "2020-02-20",
   *   "text": "any value",
   *   "number": 1
   * }
   */
  get(): Observable<Configurations> {
    return this.httpClient.get<Configurations>(
        `${this.getRootUrl()}/v1/spaces/${this.getSpace()}/environments/${this.getEnvironment()}/configurations.json`,
        {
          headers: this.getHeaders()
        }
    );
  }
}
