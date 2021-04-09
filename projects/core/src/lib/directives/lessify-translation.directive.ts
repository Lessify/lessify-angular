import {Directive, ElementRef, HostListener, Input, OnInit, Optional} from '@angular/core';
import {DesignAction, DesignEvent, DesignModelType} from '../models/design.model';
import {TranslateService} from '@ngx-translate/core';
import {TranslocoService} from '@ngneat/transloco';

@Directive({
  selector: '[lessifyTranslation]'
})
export class LessifyTranslationDirective implements OnInit {

  @Input() lessifyTranslation: string;

  constructor(
      private el: ElementRef,
      @Optional() private readonly translateService: TranslateService,
      @Optional() private readonly translocoService: TranslocoService
  ) {
  }

  ngOnInit(): void {
    if (typeof this.lessifyTranslation === undefined) {
      return;
    }
    if (this.isInIframe()) {
      this.el.nativeElement.setAttribute('data-lessify-translation-id', this.lessifyTranslation);
      this.el.nativeElement.style.outline = '#003DFF dashed';
      this.el.nativeElement.title = `Translation: ${this.lessifyTranslation}`;
      // this.el.nativeElement.style.outlineOffset = '3px';
    }
  }

  @HostListener('click')
  onClick(): void {
    if (this.isInIframe()) {
      window.parent.postMessage(
          {
            action: DesignAction.LINK,
            type: DesignModelType.TRANSLATION,
            id: this.lessifyTranslation,
            locale: this.getCurrentLanguage()
          } as DesignEvent,
          '*' // window.parent.location.origin
      );
    }
  }

  isInIframe(): boolean {
    return window.location !== window.parent.location;
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
