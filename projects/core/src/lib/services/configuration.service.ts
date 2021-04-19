import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {BaseService} from './base.service';
import {LESSIFY_CONFIG, LessifyConfig} from '../lessify.config';
import {tap} from 'rxjs/operators';

export interface Configurations {
  [key: string]: Configuration;
}

export type Configuration = string | number | boolean;

@Injectable({
  providedIn: 'root'
})
export class LessifyConfigurationService extends BaseService {

  private configurations: Configurations = {};
  private configurationsEvents: BehaviorSubject<Configurations>;
  private configurationEvents: Subject<string>;
  configChanges$: Observable<string>;
  configsChanges$: Observable<Configurations>;

  constructor(
      private readonly httpClient: HttpClient,
      @Inject(LESSIFY_CONFIG) protected readonly config: LessifyConfig
  ) {
    super(config);
    this.configurationsEvents = new BehaviorSubject<Configurations>(this.configurations);
    this.configurationEvents = new Subject<string>();
    this.configsChanges$ = this.configurationsEvents.asObservable();
    this.configChanges$ = this.configurationEvents.asObservable();
    this.sync();
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
  }

  sync(): void {
    this.fetch()
    .pipe(
        tap(it => {
          this.configurationsEvents.next(it);
          this.configurationEvents.next('*');
        })
    )
    .subscribe(it => this.configurations = it);
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
