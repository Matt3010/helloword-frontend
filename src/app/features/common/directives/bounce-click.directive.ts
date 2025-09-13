import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appBounceOnClick]'
})
export class BounceOnClickDirective {
  constructor(private readonly el: ElementRef, private readonly renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.2s ease');
  }

  @HostListener('click') onClick() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.2)');

    setTimeout(() => {
      this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
    }, 100);
  }
}
