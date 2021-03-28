import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';

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
      window.parent.postMessage({
        action: 'link',
        type: 'translation',
        id: this.lessifyTranslation
      }, '*');
    }
  }

  isInIframe(): boolean {
    return window.location !== window.parent.location;
  }
}
