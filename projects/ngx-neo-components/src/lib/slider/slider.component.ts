import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { trigger, transition, animate, keyframes } from '@angular/animations';
import * as kf from '../../lib/shared/animations/keyframes';
import { fromEvent, Observable, concat, defer, merge, Subscription } from 'rxjs';
import { map, switchMap, tap, takeUntil, takeWhile, repeat, startWith } from 'rxjs/operators';

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
  export class SliderComponent implements OnInit {

    @Output() notify: EventEmitter<string> = new EventEmitter<string>();

    public positionTranslate3d;

    public visibility: string;

    public subscription: Subscription;

    public prevDeltaX: number;
    public prevDeltaY: number;
    public translateX: number;
    public translateY: number;


    x = 0;
    y = 0;
    title = 'Drag Me!';
  
    startX = 0;
    startY = 0;

    // currentPos = 0;

    // drag$ = this.touchstart$.pipe(
    //      switchMap(start => {
    //        let pos = 0;
    //        return this.touchmove$.pipe(
    //         map(move => move.touches[0].pageY - start.touches[0].pageY),
    //          tap(p => pos = p),
    //          takeUntil(this.touchend$),
    //       );
    //      }),
    //      tap(p => {
    //     //   if (p >= 300) {
    //     //     this.headerService.requestLoad.next();
    //     //   }
    //      }),
    //     // takeWhile(p => p < 300),
    //     // repeat()
    //   );
    
    // position$: Observable<number> = this.drag$.pipe(
    //     // merge(this.completeAnimation$),
    //     // startWith(0),
    //     // tap(pos => this.currentPos = pos)
    // );
    


    // positionTranslate3d$: Observable<string> = this.position$.pipe(map(p => `translate3d(0, ${p - 250}px, 0)`));

      constructor() {
           this.visibility = 'normal';
           this.prevDeltaX = 0;
           this.prevDeltaY = 0;
           this.translateX = 0;
           this.translateY = 0;
      }

      ngOnInit() {

      }

      onSwipeLeft(event): void {
         this.visibility = 'left';
          this.notify.emit('SwipeLeft');
          
      }

      // onPan(event): void {
      //   //     var percentage = 100 / 3 * event.deltaX / window.innerWidth;
      //   //     var transformPercentage = percentage - 100 / 3;
      //   //   this.positionTranslate3d = 'translateX( ' + transformPercentage + '% )';// `translate3d(-50px, 0px, 0)`;
      //   console.log(event.deltaX, event.deltaY);
      //   var percentage = event.deltaX / window.innerWidth;
      //     this.positionTranslate3d = 'translate3d(' + percentage  + '%)';
      //     this.notify.emit('Pan');
      // }
      
      // onPan(event) {
       
      //     this.translateX += event.deltaX - this.prevDeltaX;
      //     this.translateY += event.deltaY - this.prevDeltaY;
      
      //     this.positionTranslate3d = 'translateX(' + this.translateX + ', 0, 0)';
      //     this.prevDeltaX = event.deltaX;
      //     this.prevDeltaY = event.deltaY;

      //     this.notify.emit('Pan');

      // }

      onPanStart(event: any): void {
        this.startX = this.x;
        this.startY = this.y;
      }
    
      onPan(event: any): void {
        event.preventDefault();
        this.x = this.startX + event.deltaX;
        this.y = this.startY + event.deltaY;
      }

      onSwipeRight(event): void {
           this.visibility = 'right';
           this.notify.emit('SwipeRight');
      }

    //   onPanRight(event): void {
    //    // this.positionTranslate3d = `translate3d(50px, 0px, 0)`;
    // //    var percentage = 100 / 3 * event.deltaX / window.innerWidth;
    // //         var transformPercentage = percentage - 100 / 3;
    // //       this.positionTranslate3d = 'translateX( -' + transformPercentage + '% )';
    //     this.notify.emit('PanRight');
    // }


}
