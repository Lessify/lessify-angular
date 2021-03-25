import {Directive, ElementRef, Input, OnInit} from '@angular/core';

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
  }
}
