import {Injectable, Optional} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {TranslocoService} from '@ngneat/transloco';
import {DesignEvent} from '../models/design.model';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  constructor(
      @Optional() private readonly translateService: TranslateService,
      @Optional() private readonly translocoService: TranslocoService
  ) {
    window.addEventListener('message', (event: MessageEvent) => {

    });
  }
}
