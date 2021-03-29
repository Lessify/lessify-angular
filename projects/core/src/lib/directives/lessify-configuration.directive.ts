import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {DesignAction, DesignEvent, DesignModelType} from '../models/design.model';

@Directive({
  selector: '[lessifyConfiguration]'
})
export class LessifyConfigurationDirective implements OnInit {

  @Input() lessifyConfiguration: string;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    if (typeof this.lessifyConfiguration === undefined) {
      return;
    }
    this.el.nativeElement.setAttribute('data-lessify-configuration-id', this.lessifyConfiguration);
    if (this.isInIframe()) {
      this.el.nativeElement.style.outline = 'black dashed';
      // this.el.nativeElement.style.outlineOffset = '3px';
    }
  }

  @HostListener('click')
  onClick(): void {
    if (this.isInIframe()) {
      window.parent.postMessage({
        action: DesignAction.LINK,
        type: DesignModelType.CONFIGURATION,
        id: this.lessifyConfiguration
      } as DesignEvent, window.parent.location.origin);
    }
  }

  isInIframe(): boolean {
    return window.location !== window.parent.location;
  }
}
