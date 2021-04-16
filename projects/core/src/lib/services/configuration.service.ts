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

  private configurations: Configurations = {};

  constructor(
      readonly httpClient: HttpClient,
      @Inject(LESSIFY_CONFIG) readonly config: LessifyConfig
  ) {
    super(config);
    this.sync();
  }

  get(id: string): Configuration | undefined {
    return this.configurations[id];
  }

  getAll(): Configurations {
    return this.configurations;
  }

  sync(): void {
    this.fetch().subscribe(it => this.configurations = it);
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
  fetch<T = Configurations>(): Observable<T> {
    return this.httpClient.get<T>(
        `${this.getRootUrl()}/v1/spaces/${this.getSpace()}/environments/${this.getEnvironment()}/configurations.json`,
        {
          headers: this.getHeaders()
        }
    );
  }
}
