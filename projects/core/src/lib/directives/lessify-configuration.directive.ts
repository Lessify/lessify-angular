import {Directive, ElementRef, Input, OnInit} from '@angular/core';

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
  }
}
