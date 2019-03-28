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

      onSwipeLeft(event): void {
         this.visibility = 'left';
          this.notify.emit('SwipeLeft');
          
      }

      onPanLeft(event): void {
         

          let porcentaje = 100 / 3 * event.deltaX / window.innerWidth; console.log(porcentaje);
          let transformPorcentaje = porcentaje - 100 / 3;
          console.log(event, 'EVENT');
          event.transform = 'translateX( ' + transformPorcentaje + '% )';
          event.transform = 'translateX( ' + porcentaje + '% )';
          this.notify.emit('PanLeft');
      }

      onSwipeRight(event): void {
           this.visibility = 'right';
           this.notify.emit('SwipeRight');
      }

      onPanRight(event): void {
        this.notify.emit('PanRight');
    }


//     var sliderEl = document.querySelector( '.slider' );
// var slideCount = 3;
// var activeSlide = 0; // NEW: the current slide # (0 = first)
// var sliderManager = new Hammer.Manager( sliderEl );
// sliderManager.add( new Hammer.Pan({ threshold: 0, pointers: 0 }) );
// sliderManager.on( 'pan', function( e ) {
//   var percentage = 100 / slideCount * e.deltaX / window.innerWidth;
//   var transformPercentage = percentage - 100 / slideCount * activeSlide; // NEW
//   sliderEl.style.transform = 'translateX( ' + transformPercentage + '% )';
//   if( e.isFinal ) { // NEW: this only runs on event end
//     if( percentage < 0 )
//       goToSlide( activeSlide + 1 );
//     else if( percentage > 0 )
//       goToSlide( activeSlide - 1 );
//     else
//       goToSlide( activeSlide );
//   }
// });

// // NEW: function that changes the slide
// var goToSlide = function( number ) {
//   if( number < 0 )
//     activeSlide = 0;
//   else if( number > slideCount - 1 )
//     activeSlide = slideCount - 1
//   else
//     activeSlide = number;

//  var percentage = -( 100 / slideCount ) * activeSlide;
//  sliderEl.style.transform = 'translateX( ' + percentage + '% )';
// };

}
