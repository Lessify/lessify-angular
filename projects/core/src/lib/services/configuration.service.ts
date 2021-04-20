import {Inject, Injectable, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {BaseService} from './base.service';
import {LESSIFY_CONFIG, LessifyModuleConfig} from '../lessify.config';
import {tap} from 'rxjs/operators';
import {LessifyLoggerService} from './logger.service';

export interface Configurations {
  [key: string]: Configuration;
}

export type Configuration = string | number | boolean;

@Injectable({
  providedIn: 'root'
})
export class LessifyConfigurationService extends BaseService implements OnDestroy {

  private configurations: Configurations = {};
  private configurationsEvents: BehaviorSubject<Configurations>;
  private configurationEvents: Subject<string>;
  configsChanges$: Observable<Configurations>;
  configChanges$: Observable<string>;

  constructor(
      private readonly httpClient: HttpClient,
      private readonly logger: LessifyLoggerService,
      @Inject(LESSIFY_CONFIG) protected readonly config: LessifyModuleConfig
  ) {
    super(config);
    this.configurationsEvents = new BehaviorSubject<Configurations>(this.configurations);
    this.configurationEvents = new Subject<string>();
    this.configsChanges$ = this.configurationsEvents.asObservable();
    this.configChanges$ = this.configurationEvents.asObservable();
    this.sync();
    this.logger.debug('LessifyConfigurationService : constructor');
  }

  get(id: string): Configuration | undefined {
    return this.configurations[id];
  }

  getAll(): Configurations {
    return this.configurations;
  }

  set(id: string, value: Configuration): void {
    if (id == null || id === '' || value == null) {
      return;
    }
    this.configurations[id] = value;
    this.configurationsEvents.next(this.configurations);
    this.configurationEvents.next(id);
    this.logger.debug(`Updated Configuration '${id}' with value '${value}'.`);
  }

  sync(): void {
    this.fetch()
    .pipe(
        tap(it => {
          this.configurationsEvents.next(it);
          this.configurationEvents.next('*');
        })
    )
    .subscribe(
        it => this.configurations = it,
        () => {
        },
        () => {
          this.logger.debug(`Configuration Sync completed.`);
        }
    );
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

  ngOnDestroy(): void {
    this.configurationsEvents.unsubscribe();
    this.configurationEvents.unsubscribe();
    this.logger.debug('LessifyConfigurationService : ngOnDestroy');
  }
}
