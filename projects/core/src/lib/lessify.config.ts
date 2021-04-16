import {InjectionToken} from '@angular/core';

export type LessifyConfig = {
  spaceId: string;
  environment: string;
  apiKey: string;
  beta?: boolean;
};

export const LESSIFY_CONFIG = new InjectionToken('LESSIFY_CONFIG', {
  providedIn: 'root',
  factory: () => {
    return {};
  }
});
