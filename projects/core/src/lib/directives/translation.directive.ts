import {Directive, ElementRef, HostListener, Inject, Input, OnInit, Optional} from '@angular/core';
import {DesignAction, DesignEvent, DesignModelType} from '../models/design.model';
import {TranslateService} from '@ngx-translate/core';
import {TranslocoService} from '@ngneat/transloco';
import {DesignUtil} from '../utils/design.util';
import {LESSIFY_CONFIG, LessifyModuleConfig} from '../lessify.config';
import {LessifyLoggerService} from '../services/logger.service';

@Directive({
  selector: '[lessifyTransl]'
})
export class TranslationDirective implements OnInit {

  @Input() lessifyTransl: string;

  constructor(
      private el: ElementRef,
      @Optional() private readonly translateService: TranslateService,
      @Optional() private readonly translocoService: TranslocoService,
      @Inject(LESSIFY_CONFIG) protected readonly config: LessifyModuleConfig,
      private readonly logger: LessifyLoggerService
  ) {
  }

  ngOnInit(): void {
    if (typeof this.lessifyTransl === undefined) {
      return;
    }
    // this.logger.debug(`lessifyTransl: ngOnInit = '${this.lessifyTransl}'`);
    if (DesignUtil.isInIframe()) {
      this.el.nativeElement.setAttribute('data-lessify-translation-id', this.lessifyTransl);
      this.el.nativeElement.style.outline = '#003DFF dashed';
      this.el.nativeElement.title = `Translation: ${this.lessifyTransl}`;
      // this.el.nativeElement.style.outlineOffset = '3px';
    }
  }

  @HostListener('click')
  onClick(): void {
    this.logger.debug(`lessifyTransl(${this.lessifyTransl}): click`);
    if (DesignUtil.isInIframe()) {
      const message: DesignEvent = {
        action: DesignAction.LINK,
        type: DesignModelType.TRANSLATION,
        space: this.config.spaceId,
        environment: this.config.environment,
        id: this.lessifyTransl,
        locale: this.getCurrentLanguage()
      };
      window.parent.postMessage(message, '*'); // window.parent.location.origin
      this.logger.debug(`lessifyTransl(${this.lessifyTransl}): Send message -> ${JSON.stringify(message)}`);
    }
  }

  getCurrentLanguage(): string | null {
    if (this.translateService) {
      return this.translateService.currentLang;
    } else if (this.translocoService) {
      return this.translocoService.getActiveLang();
    }
    return null;
  }
}
