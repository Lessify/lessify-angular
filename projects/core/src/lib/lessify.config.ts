import {InjectionToken} from '@angular/core';

export type LessifyModuleConfig = {
  spaceId: string;
  environment: string;
  apiKey: string;
  beta?: boolean;
  logLevel?: 'trace' | 'debug' | 'info' | 'warn' | 'error';
};

export const LESSIFY_CONFIG = new InjectionToken('LESSIFY_CONFIG', {
  providedIn: 'root',
  factory: () => {
    return {};
  }
});
