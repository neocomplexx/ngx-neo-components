import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subject, Subscription, fromEvent, defer, timer, Observable } from 'rxjs';
import { MobileSidebarService } from './mobile-sidebar.service';
import { take, switchMap, map, repeat, tap, takeUntil, concat, takeWhile, merge, startWith, debounceTime } from 'rxjs/operators';
import { trigger, transition, animate, keyframes } from '@angular/animations';
import * as kf from '../shared/animations/keyframes';
import { Router } from '@angular/router';


enum State {
  OPENING = 'OPENING',
  CLOSING = 'CLOSING',
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}


@Component({
  selector: 'neo-mobile-sidebar',
  templateUrl: './mobile-sidebar.component.html',
  styleUrls: ['./mobile-sidebar.component.scss'],
  animations: [
    trigger('fadeShadow', [
      transition('CLOSED => OPEN', animate(500, keyframes(kf.fadeIn))),
      transition('OPEN => CLOSED', animate(500, keyframes(kf.fadeOut))),
      transition(':leave', animate(500, keyframes(kf.fadeOut))),
    ]),
  ]
})
export class MobileSidebarComponent implements OnInit, OnDestroy {

  public showSidebar = false;
  public x = 0;
  public startX = 0;
  public xPrev = 0;

  public isTouching = false;

  public state: State = State.CLOSED;

  private sidebarShowSubscription: Subscription = new Subscription();


  constructor(private mobileSidebarService: MobileSidebarService,
    public router: Router) { }

  ngOnInit() {
    this.sidebarShowSubscription.add(
      this.mobileSidebarService.showSidebar.subscribe((value) => {
        if (value) {
          this.startX = this.getWidthFromPercent(85);
          this.x = this.getWidthFromPercent(85);
          this.xPrev = this.getWidthFromPercent(85);
          this.state = State.OPEN;
        }
      }
      ));
  }

  ngOnDestroy() {
    this.sidebarShowSubscription.unsubscribe();
  }

  public closeSidebar() {
    this.state = State.CLOSED;
    this.startX = 0;
    this.x = 0;
    this.xPrev = 0;
  }

  private getPercentFromWidth(currentWidth: number) {
    const windowWidth = window.innerWidth;
    return (currentWidth * 100 / windowWidth);
  }

  private getWidthFromPercent(percent: number) {
    const windowWidth = window.innerWidth;
    return (windowWidth * percent / 100);
  }

  public getTranslation() {
    if (this.state === State.CLOSED) {
      return '-100%';
    } else {
      return (this.x - this.getWidthFromPercent(85)) + 'px' ;
    }
  }

  public getOpacity() {
    const value = this.getPercentFromWidth(this.x) / 85;
    return +value.toFixed(1);
  }

  public showBackdrop() {
    return this.state !== State.CLOSED;
  }

  @HostListener('document:panstart', ['$event'])
  public onPanStart(event) {
    if (this.state === State.CLOSED // only execute when the sidebar is closed
      && event.center.x < 30 // If pressed on the border
      && event.velocityY < event.velocityX // Swiped in the X axis more than the Y
      && event.center.x !== 0 && event.center.y !== 0 // Avoid bug of hammerJS
    ) {
      this.isTouching = true;
      this.state = State.OPENING;
      this.startX = this.x;
    } else {
      if (this.state === State.OPEN) {
        this.isTouching = true;
        this.state = State.CLOSING;
        this.startX = this.x;
      }
    }
  }

  @HostListener('document:pan', ['$event'])
  public onPan(event) {
    if (this.state === State.OPENING || this.state === State.CLOSING) {
      const deltaX = event.deltaX;
      const position = this.startX + deltaX;
      if (this.getPercentFromWidth(position) < 85) {
        this.xPrev = this.x;
        this.x = this.startX + deltaX;
      }
    }
  }

  @HostListener('document:panend', ['$event'])
  public onPanEnd(event) {
    this.isTouching = false;
    if (this.getPercentFromWidth(this.x) < 40) {
      this.state = State.CLOSED;
      this.startX = 0;
      this.x = 0;
      this.xPrev = 0;
    } else {
      this.startX = this.getWidthFromPercent(85);
      this.x = this.getWidthFromPercent(85);
      this.xPrev = this.getWidthFromPercent(85);
      this.state = State.OPEN;
    }
  }

}
