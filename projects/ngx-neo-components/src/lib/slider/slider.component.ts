import { Component, Output, EventEmitter, Input } from '@angular/core';
import { trigger, transition, animate, keyframes } from '@angular/animations';
import * as kf from '../../lib/shared/animations/keyframes';
import { Observable, timer } from 'rxjs';
import { UndoComponent } from '../undo-component/undo.component';
import { UndoService } from '../undo-component/undo.service';

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
  export class SliderComponent {

    @Output() notifySwipeLeft: EventEmitter<string> = new EventEmitter<string>();
    @Output() notifySwipeRight: EventEmitter<string> = new EventEmitter<string>();
    @Input() iconoizq: string;
    @Input() iconoder: string;
    @Input() textoizq: string;
    @Input() textoder: string;
    @Input() leftBackground: string;
    @Input() rightBackground: string;
  //  @Input() neoUndo: UndoComponent;

    public visibility: string;
    public x = 0;
    public y = 0;
    public startX = 0;
    public startY = 0;
    public xPrev = 0;
    public yPrev = 0;

    constructor(private undoService: UndoService) {
      this.visibility = 'normal';
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
    onPan(event): void { // console.log('DENTRO DEL SLIDER, el neo undo: ', this.neoUndo);
      event.preventDefault(); 
      const clientWidth = event.target.clientWidth; console.log(clientWidth, clientWidth * 0.5);

      if (event.type !== 'panend') {
          this.xPrev = this.x;
      }
      this.x = this.startX + event.deltaX;
      if ((this.xPrev > this.x) && event.type === 'panend') {

        if (this.x < - (clientWidth * 0.5)) {
          this.visibility = 'left';
          setTimeout(async () =>  {
              this.visibility = 'normal';
              this.x = 0;
              this.xPrev = 0;
          }, 1200);
         // this.neoUndo.showUndoComponent(); 
          this.undoService.showUndo.next(true);
          this.notifySwipeLeft.emit('PanLeft');
        } else {
              this.visibility = 'normal';
              this.x = 0;
              this.xPrev = 0;
        }

      } else if (this.xPrev <= this.x && event.type === 'panend') {

        if (this.x > (clientWidth * 0.5)) {
          this.visibility = 'right';
          setTimeout(async () =>  {
              this.visibility = 'normal';
              this.x = 0;
              this.xPrev = 0;
          }, 1200);
         // this.neoUndo.showUndoComponent();
         this.undoService.showUndo.next(true);
          this.notifySwipeRight.emit('PanRight');
        } else {
              this.visibility = 'normal';
              this.x = 0;
              this.xPrev = 0;
        }

      }
    }

    onSwipeLeft(event): void {
      event.srcEvent.preventDefault();
      event.srcEvent.stopPropagation();
      this.visibility = 'left';
   //   this.notifySwipeLeft.emit('SwipeLeft');
    }

    onSwipeRight(event): void {
      event.srcEvent.preventDefault();
      event.srcEvent.stopPropagation();
      this.visibility = 'right';
     // this.notifySwipeRight.emit('SwipeRight');
    }

}
