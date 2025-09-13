import {Directive, ElementRef, HostListener, OnInit} from '@angular/core';

@Directive({
  selector: '[appAlwaysFocus]',
})
export class AlwaysFocusDirective implements OnInit {

  constructor(private readonly el: ElementRef) {}

  public ngOnInit() {
    this.el.nativeElement.focus();
  }

  @HostListener('blur') onBlur() {
    this.el.nativeElement.focus();
  }
}
