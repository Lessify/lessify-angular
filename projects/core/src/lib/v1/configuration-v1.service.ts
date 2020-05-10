import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseService} from '../base.service';
import {SpaceConfig} from '../core.module';

export interface LessifyConfiguration {
  [key: string]: string | number | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigurationV1Service extends BaseService {
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
  get(): Observable<any> {
    return this.httpClient.get(
        `${this.getRootUrl()}/v1/spaces/${this.config.spaceId}/environments/${this.config.environment}/configurations.json`,
        {
          headers: this.getHeaders()
        }
    );
  }
}
