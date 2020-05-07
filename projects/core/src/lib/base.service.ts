import {HttpHeaders} from '@angular/common/http';
import {SpaceConfig} from './core.module';

export abstract class BaseService {

  constructor(
      protected readonly config: SpaceConfig
  ) {
  }

  getRootUrl(): string {
    return (this.config.beta == null || this.config.beta === false) ? 'https://api.lessify.io' : 'https://dev-api.lessify.io';
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.config.apiKey}`
    });
  }
}
