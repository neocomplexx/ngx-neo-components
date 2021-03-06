import { Component, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { trigger, transition, animate, keyframes } from '@angular/animations';
import * as kf from '../shared/animations/keyframes';
import { UndoService } from '../undo-component/undo.service';

@Component({
    selector: 'neo-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    animations: [
        trigger('sliderAnimator', [
            transition('* => right', animate(1000, keyframes(kf.slideOutRight))),
            transition('* => left', animate(1000, keyframes(kf.slideOutLeft)))
        ]),
    ]
  })
  export class SliderComponent {

    @Output() notifySwipeLeft: EventEmitter<string> = new EventEmitter<string>();
    @Output() notifySwipeRight: EventEmitter<string> = new EventEmitter<string>();
    @Input() leftIcon: string;
    @Input() rightIcon: string;
    @Input() leftText: string;
    @Input() rightText: string;
    @Input() leftBackground: string;
    @Input() rightBackground: string;

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

    public getBackground() {
      if (this.x > 0) {
        return this.leftBackground;
      } else if (this.x < 0) {
        return this.rightBackground;
      }
      return '';
    }

    onPanStart(event: any): void {
        this.startX = this.x;
    }

    /**
     * Explicación: mantengo la posición previa para poder saber si deslizo a izquierda o a derecha cuando detecto un panend
     * Cada vez que hago un panmove le sumo a la posición x el delta x del evento
     * @param event evento pan
     */
    onPan(event): void {
      event.preventDefault();
      const clientWidth = event.target.clientWidth;
      if (event.type !== 'panend') {
          this.xPrev = this.x;
      }
      this.x = this.startX + event.deltaX;
      if ((this.xPrev > this.x) && event.type === 'panend') {
        if (this.x < - (clientWidth * 0.4)) {
          this.visibility = 'left';
          setTimeout(async () =>  {
              this.visibility = 'normal';
              this.x = 0;
              this.xPrev = 0;
          }, 500);
         setTimeout(() =>  {
            this.undoService.showUndo.next(true);
            this.notifySwipeLeft.emit();
          }, 500);
        } else {
              this.visibility = 'normal';
              this.x = 0;
              this.xPrev = 0;
        }
      } else if (this.xPrev <= this.x && event.type === 'panend') {
        if (this.x > (clientWidth * 0.4)) {
          this.visibility = 'right';
          setTimeout(async () =>  {
              this.visibility = 'normal';
              this.x = 0;
              this.xPrev = 0;
          }, 500);
         setTimeout(() =>  {
              this.undoService.showUndo.next(true);
              this.notifySwipeRight.emit();
          }, 500);
        } else {
              this.visibility = 'normal';
              this.x = 0;
              this.xPrev = 0;
        }
      }
    }

  @HostListener('document:pancancel', ['$event'])
  public onCancel(event) {
    this.visibility = 'normal';
    this.x = 0;
    this.xPrev = 0;
    this.startX = 0;
  }


    onSwipeLeft(event): void {
      event.srcEvent.preventDefault();
      event.srcEvent.stopPropagation();
      this.visibility = 'left';
    }

    onSwipeRight(event): void {
      event.srcEvent.preventDefault();
      event.srcEvent.stopPropagation();
      this.visibility = 'right';
    }

}
