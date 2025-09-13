import { Directive, ElementRef, HostListener, Input, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({
  selector: 'p[appAutofitFont],span[appAutofitFont], input[appAutofitFont]',
  standalone: true
})
export class AutofitFontDirective implements AfterViewInit, OnDestroy {

  // should be used for a paragraph or span into a width defined element such as a div (width: 90%, width: 100px...).

  @Input() minFontSize: number = 10;

  protected canvasContext!: CanvasRenderingContext2D;
  private initialProperties!: {
    fontSize: number;
    fontWeight: string;
    fontFamily: string;
  };

  private resizeObserver!: ResizeObserver;
  private debounceTimer: any;

  constructor(private readonly el: ElementRef<HTMLInputElement>) {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    this.canvasContext = canvas.getContext('2d')!;
  }

  public ngAfterViewInit(): void {
    const computedStyle: CSSStyleDeclaration = window.getComputedStyle(this.el.nativeElement);
    this.initialProperties = {
      fontSize: parseFloat(computedStyle.fontSize),
      fontWeight: computedStyle.fontWeight,
      fontFamily: computedStyle.fontFamily
    };

    this.resizeObserver = new ResizeObserver((): void => this.onResize());
    this.resizeObserver.observe(this.el.nativeElement);

    setTimeout(() => this.adjustFontSize(), 0);
  }

  public ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    clearTimeout(this.debounceTimer);
  }

  @HostListener('input')
  onInput(): void {
    this.adjustFontSize();
  }

  private onResize(): void {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => this.adjustFontSize(), 100);
  }

  private adjustFontSize(): void {
    const element: HTMLInputElement = this.el.nativeElement;
    const containerWidth: number = element.clientWidth;

    if (containerWidth <= 0) {
      return;
    }

    const text: string = element.value || element.placeholder;

    let min: number = this.minFontSize;
    let max: number = this.initialProperties.fontSize;
    let optimalSize: number = this.minFontSize;

    while (min <= max) {
      const mid: number = Math.floor((min + max) / 2);

      this.canvasContext.font = `${this.initialProperties.fontWeight} ${mid}px ${this.initialProperties.fontFamily}`;

      const textWidth: number = this.canvasContext.measureText(text).width;

      if (textWidth <= containerWidth) {
        optimalSize = mid;
        min = mid + 1;
      } else {
        max = mid - 1;
      }
    }

    // Applichiamo la dimensione ottima trovata
    element.style.fontSize = `${optimalSize}px`;
  }
}
