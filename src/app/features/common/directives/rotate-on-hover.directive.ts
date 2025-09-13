import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appRotateOnHover]'
})
export class RotateOnHoverDirective {
  private readonly rotation: number = 45;

  constructor(private readonly el: ElementRef, private readonly renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.3s ease');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      `rotate(${this.rotation}deg)`
    );
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'rotate(0deg)');
  }
}
