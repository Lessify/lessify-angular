import {HttpHeaders} from '@angular/common/http';
import {SpaceConfig} from '../models/module.model';

export abstract class BaseService {

  protected constructor(
      protected readonly config: SpaceConfig
  ) {
    if (this.config.spaceId == null || this.config.spaceId === '') {
      throw new Error('Lessify Configuration Space can\'t be empty');
    }
    if (this.config.environment == null || this.config.environment === '') {
      throw new Error('Lessify Configuration Environment can\'t be empty');
    }
    if (this.config.apiKey == null || this.config.apiKey === '') {
      throw new Error('Lessify Configuration API Key can\'t be empty');
    }
  }

  getRootUrl(): string {
    return (this.config.beta == null || this.config.beta === false) ? 'https://api.lessify.io' : 'https://dev-api.lessify.io';
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.config.apiKey}`
    });
  }

  getSpace(): string {
    return this.config.spaceId;
  }

  getEnvironment(): string {
    return this.config.environment;
  }
}
