import { Component, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { trigger, transition, animate, keyframes } from '@angular/animations';
import * as kf from '../../lib/shared/animations/keyframes';

@Component({
    selector: 'neo-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    animations: [
        trigger('sliderAnimator', [
            transition('* => right', animate(1300, keyframes(kf.slideOutRight))),
            transition('* => left', animate(1300, keyframes(kf.slideOutLeft))),
        ]),
    ]
  })
  export class SliderComponent implements AfterViewInit{

    @Output() notify: EventEmitter<string> = new EventEmitter<string>();

    public visibility: string;
    public x = 0;
    public y = 0;
    public startX = 0;
    public startY = 0;
    public xPrev = 0;
    public yPrev = 0;

    constructor() {
      this.visibility = 'normal';
    }

    ngAfterViewInit() {
    }

    onPanStart(event: any): void {
      this.startX = this.x;
      this.startY = this.y;
    }

    /**
     * Explicación: mantengo la posición previa para poder saber si deslizo a izquierda o a derecha cuando detecto un panend
     * Cada vez que hago un panmove le sumo a la posición x el delta x del evento
     * @param event evento pan
     */
    onPan(event: any): void {
      event.preventDefault();
      if (event.type !== 'panend') {
          this.xPrev = this.x;
      }
      this.x = this.startX + event.deltaX;
      if ((this.xPrev > this.x) && event.type === 'panend') {
          this.visibility = 'left';
          setTimeout(async () =>  {
              this.visibility = 'normal';
              this.x = 0;
              this.xPrev = 0;
          }, 1200);
          this.notify.emit('PanLeft');
      } else if (this.xPrev <= this.x && event.type === 'panend') {
          this.visibility = 'right';
          setTimeout(async () =>  {
              this.visibility = 'normal';
              this.x = 0;
              this.xPrev = 0;
          }, 1200);
          this.notify.emit('PanRight');
      }
    }

    onSwipeLeft(event): void {
      this.visibility = 'left';
      this.notify.emit('SwipeLeft');
    }

    onSwipeRight(event): void {
      this.visibility = 'right';
      this.notify.emit('SwipeRight');
    }

}
