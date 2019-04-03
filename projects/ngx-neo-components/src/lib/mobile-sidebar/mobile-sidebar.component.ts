import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subject, Subscription, fromEvent, defer, timer, Observable } from 'rxjs';
import { MobileSidebarService } from './mobile-sidebar.service';
import { take, switchMap, map, repeat, tap, takeUntil, concat, takeWhile, merge, startWith, debounceTime } from 'rxjs/operators';
import { trigger, transition, animate, keyframes } from '@angular/animations';
import * as kf from '../shared/animations/keyframes';


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
    trigger('sideShow', [
      transition(':enter', animate(500, keyframes(kf.sladeInLeft))),
      transition(':leave', animate(500, keyframes(kf.slideOutLeft))),
    ]),
    trigger('fadeShadow', [
      transition(':leave', animate(500, keyframes(kf.fadeOut))),
      transition(':enter', animate(500, keyframes(kf.fadeIn))),
    ]),
  ]
})
export class MobileSidebarComponent implements OnInit, OnDestroy {

  public showSidebar = false;
  public x = 0;
  public startX = 0;
  public xPrev = 0;

  public state: State = State.CLOSED;

  private sidebarShowSubscription: Subscription = new Subscription();

  constructor(private mobileSidebarService: MobileSidebarService) { }

  ngOnInit() {
    this.sidebarShowSubscription.add(
      this.mobileSidebarService.showSidebar.subscribe((value) => {
        console.log(this.showSidebar, value);
        this.showSidebar = value;
      }
      ));
  }

  ngOnDestroy() {
    this.sidebarShowSubscription.unsubscribe();
  }

  public closeSidebar() {
    this.mobileSidebarService.showSidebar.next(false);
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
    return `translate3d( ${this.x - this.getWidthFromPercent(85)}px, 0 , 0)`;
  }

  public getOpacity() {
    const value =  this.getPercentFromWidth(this.x) / 85;
    return +value.toFixed(1);
  }

  public showBackdrop() {
    return this.state !== State.CLOSED;
  }

  @HostListener('document:panstart', ['$event'])
  public onPanStart(event) {
    if (this.state === State.CLOSED && event.center.x < 30) {
      this.state = State.OPENING;
      this.startX = this.x;
    } else {
      if (this.state === State.OPEN) {
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
    if (this.getPercentFromWidth(this.x) < 40) {
      this.state = State.CLOSED;
      this.startX = 0;
      this.x = 0;
      this.xPrev = 0;
    } else {
      this.state = State.OPEN;
      this.startX = this.getWidthFromPercent(85);
      this.x = this.getWidthFromPercent(85);
      this.xPrev = this.getWidthFromPercent(85);
    }
  }

}
