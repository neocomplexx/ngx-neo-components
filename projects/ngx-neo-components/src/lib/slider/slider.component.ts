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

    public xPrev = 0;
    public yPrev = 0;

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
        console.log(event.type, 'El delta ' + event.deltaX, 'El previo ' + this.xPrev, 'El x ', this.x);
        if (event.type !== 'panend') {
            this.xPrev = this.x;
        }
        
        this.x = this.startX + event.deltaX;
        console.log('Me muevo desde ' + this.xPrev + ' a ' + this.x);
        if ( (this.xPrev > this.x) && event.type === 'panend') { // this.x < -20
            this.visibility = 'left';
            console.log('Entre en el left');
            setTimeout(async () =>  {
              this.visibility = 'normal';
              this.x = 0;
              this.xPrev = 0;
              console.log('Ejecutando el timeout left');
          }, 800);
          this.notify.emit('PanLeft');
        } else if (this.xPrev <= this.x && event.type === 'panend') { // (window.innerWidth / 3) (this.x >= 60) && 
            this.visibility = 'right';
            console.log('Entre en el right');
            setTimeout(async () =>  {
              this.visibility = 'normal';
              this.x = 0;
              this.xPrev = 0;
              console.log('Ejecutando el timeout right');
          }, 800);
          this.notify.emit('PanRight');
        }
      }

      onSwipeRight(event): void {
           this.visibility = 'right';
           this.notify.emit('SwipeRight');
      }

}
