import { Component, Output, EventEmitter } from "@angular/core";
import { trigger, transition, animate, keyframes } from '@angular/animations';
import * as kf from '../../lib/shared/animations/keyframes';

@Component({
    selector: 'neo-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    animations: [
        trigger('notificationAnimator', [
            transition('* => right', animate(1000, keyframes(kf.slideOutRight))),
            transition('* => left', animate(1000, keyframes(kf.slideOutLeft))),
        ]),
    ]
  })
  export class SliderComponent {

    @Output() notify: EventEmitter<string> = new EventEmitter<string>();

    public visibility: string;

      constructor() {
           this.visibility = 'normal';
      }

      onSwipeLeft(): void {
         this.visibility = 'left';
          this.notify.emit('SwipeLeft');
          
      }

      onSwipeRight(): void {
          this.notify.emit('SwipeRight');
           this.visibility = 'right';
      }

      
}
