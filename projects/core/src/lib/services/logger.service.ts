import {Inject, Injectable} from '@angular/core';
import {LESSIFY_CONFIG, LessifyModuleConfig} from '../lessify.config';
import {DesignUtil} from '../utils/design.util';

@Injectable({
  providedIn: 'root'
})
export class LessifyLoggerService {

  level: 'trace' | 'debug' | 'info' | 'warn' | 'error' = 'info';

  constructor(
      @Inject(LESSIFY_CONFIG) protected readonly config: LessifyModuleConfig
  ) {
    if (config.logLevel) {
      this.level = config.logLevel;
    }
  }

  isTraceEnabled(): boolean {
    switch (this.level) {
      case 'error' || 'warn' || 'info' || 'debug':
        return false;
      default :
        return true;
    }
  }

  isDebugEnabled(): boolean {
    switch (this.level) {
      case 'error' || 'warn' || 'info':
        return false;
      default :
        return true;
    }
  }

  isInfoEnabled(): boolean {
    switch (this.level) {
      case 'error' || 'warn':
        return false;
      default :
        return true;
    }
  }

  isWarnEnabled(): boolean {
    switch (this.level) {
      case 'error':
        return false;
      default :
        return true;
    }
  }

  isErrorEnabled(): boolean {
    return true;
  }

  trace(message: any): void {
    if (this.isTraceEnabled()) {
      // tslint:disable-next-line:no-console
      console.trace(message);
    }
  }

  debug(message: any): void {
    if (this.isDebugEnabled()) {
      // tslint:disable-next-line:no-console
      console.info(message, DesignUtil.isInIframe() ? '[In Frame]' : '', window.location.href);
    }
  }

  info(message: any): void {
    if (this.isInfoEnabled()) {
      // tslint:disable-next-line:no-console
      console.info(message);
    }
  }

  warn(message: any): void {
    if (this.isWarnEnabled()) {
      console.warn(message);
    }
  }

  error(message: any): void {
    if (this.isErrorEnabled()) {
      console.error(message);
    }
  }


}
