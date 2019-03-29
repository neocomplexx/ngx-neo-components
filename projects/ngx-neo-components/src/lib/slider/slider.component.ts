import { Component, Output, EventEmitter } from "@angular/core";
import { trigger, transition, animate, keyframes } from '@angular/animations';
import * as kf from '../../lib/shared/animations/keyframes';

@Component({
    selector: 'neo-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    animations: [
        trigger('sliderAnimator', [
            transition('* => right', animate(1000, keyframes(kf.slideOutRight))),
            transition('* => left', animate(1000, keyframes(kf.slideOutLeft))),
        ]),
    ]
  })
  export class SliderComponent {

    @Output() notify: EventEmitter<string> = new EventEmitter<string>();

    public positionTranslate3d;

    public visibility: string;

    public x = 0;
    public y = 0;
    public startX = 0;
    public startY = 0;

    constructor() {
      this.visibility = 'normal';
    }

    onSwipeLeft(event): void {
      this.visibility = 'left';
      this.notify.emit('SwipeLeft');
    }

      onPanStart(event: any): void {
        this.startX = this.x;
        this.startY = this.y;
      }
    
      onPan(event: any): void {
        event.preventDefault();
        this.x = this.startX + event.deltaX;
        this.y = this.startY + event.deltaY;
        if (this.x < -20) {
            this.visibility = 'left';
            console.log('Entre en el left');
            setTimeout(async () =>  {
              this.visibility = 'normal';
              this.x = 0;
              console.log('Ejecutando el timeout left');
          }, 800);
          this.notify.emit('PanLeft');
        } else if (this.x >= 60) { // (window.innerWidth / 3)
            this.visibility = 'right';
            console.log('Entre en el right');
            setTimeout(async () =>  {
              this.visibility = 'normal';
              this.x = 0;
              console.log('Ejecutando el timeout right');
          }, 800);
          this.notify.emit('PanRight');
        }
        console.log('PAN', this.x, this.y, window.innerWidth);
      }

      onSwipeRight(event): void {
           this.visibility = 'right';
           this.notify.emit('SwipeRight');
      }

}
