import {Directive, ElementRef, HostListener, Input, OnInit, Optional} from '@angular/core';
import {DesignAction, DesignEvent, DesignModelType} from '../models/design.model';
import {TranslateService} from '@ngx-translate/core';
import {TranslocoService} from '@ngneat/transloco';
import {DesignUtil} from '../utils/design.util';

@Directive({
  selector: '[lessifyTransl]'
})
export class TranslationDirective implements OnInit {

  @Input() lessTransl: string;

  constructor(
      private el: ElementRef,
      @Optional() private readonly translateService: TranslateService,
      @Optional() private readonly translocoService: TranslocoService
  ) {
  }

  ngOnInit(): void {
    if (typeof this.lessTransl === undefined) {
      return;
    }
    if (DesignUtil.isInIframe()) {
      this.el.nativeElement.setAttribute('data-lessify-translation-id', this.lessTransl);
      this.el.nativeElement.style.outline = '#003DFF dashed';
      this.el.nativeElement.title = `Translation: ${this.lessTransl}`;
      // this.el.nativeElement.style.outlineOffset = '3px';
    }
  }

  @HostListener('click')
  onClick(): void {
    if (DesignUtil.isInIframe()) {
      window.parent.postMessage(
          {
            action: DesignAction.LINK,
            type: DesignModelType.TRANSLATION,
            id: this.lessTransl,
            locale: this.getCurrentLanguage()
          } as DesignEvent,
          '*' // window.parent.location.origin
      );
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
