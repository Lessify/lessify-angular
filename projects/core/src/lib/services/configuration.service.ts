import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseService} from './base.service';
import {LESSIFY_CONFIG, LessifyConfig} from '../lessify.config';

export interface Configurations {
  [key: string]: Configuration;
}

export type Configuration = string | number | boolean;

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService extends BaseService {

  configurations: Map<string, Configuration> = new Map<string, Configuration>();

  constructor(
      readonly httpClient: HttpClient,
      @Inject(LESSIFY_CONFIG) readonly config: LessifyConfig
  ) {
    super(config);
  }

  get(id: string): Configuration | undefined {
    return this.configurations.get(id);
  }

  sync(): void {
    this.fetch().subscribe( configs => {
      Object.getOwnPropertyNames(configs).forEach( it => this.configurations.set(it, configs[it]));
    });
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
  fetch<T>(): Observable<T>;
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
  fetch(): Observable<Configurations> {
    return this.httpClient.get<Configurations>(
        `${this.getRootUrl()}/v1/spaces/${this.getSpace()}/environments/${this.getEnvironment()}/configurations.json`,
        {
          headers: this.getHeaders()
        }
    );
  }
}
