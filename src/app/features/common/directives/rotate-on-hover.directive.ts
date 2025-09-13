import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appRotateOnHover]'
})
export class RotateOnHoverDirective {
  private rotation = 45; // degrees to rotate

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Set initial transition for smooth animation
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
