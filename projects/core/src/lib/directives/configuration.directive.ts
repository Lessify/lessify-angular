import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {DesignAction, DesignEvent, DesignModelType} from '../models/design.model';
import {DesignUtil} from '../utils/design.util';

@Directive({
  selector: '[lessifyConfig]'
})
export class ConfigurationDirective implements OnInit {

  @Input() lessifyConfig: string;

  constructor(
      private el: ElementRef
  ) {
  }

  ngOnInit(): void {
    if (typeof this.lessifyConfig === undefined) {
      return;
    }
    if (DesignUtil.isInIframe()) {
      this.el.nativeElement.setAttribute('data-lessify-configuration-id', this.lessifyConfig);
      this.el.nativeElement.style.outline = '#23252B dashed';
      this.el.nativeElement.title = `Configuration: ${this.lessifyConfig}`;
      // this.el.nativeElement.style.outlineOffset = '3px';
    }
  }

  @HostListener('click')
  onClick(): void {
    if (DesignUtil.isInIframe()) {
      window.parent.postMessage({
        action: DesignAction.LINK,
        type: DesignModelType.CONFIGURATION,
        id: this.lessifyConfig
      } as DesignEvent, '*');
    }
  }
}
