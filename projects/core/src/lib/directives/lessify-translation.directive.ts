import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {DesignAction, DesignModelType, DesignEvent} from '../models/design.model';

@Directive({
  selector: '[lessifyTranslation]'
})
export class LessifyTranslationDirective implements OnInit {

  @Input() lessifyTranslation: string;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    if (typeof this.lessifyTranslation === undefined) {
      return;
    }
    this.el.nativeElement.setAttribute('data-lessify-translation-id', this.lessifyTranslation);
    if (this.isInIframe()) {
      this.el.nativeElement.style.outline = 'black dashed';
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
            id: this.lessifyTranslation
          } as DesignEvent,
          '*' // window.parent.location.origin
      );
    }
  }

  isInIframe(): boolean {
    return window.location !== window.parent.location;
  }
}
