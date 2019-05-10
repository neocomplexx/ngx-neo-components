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

const SIDEBAR_WIDTH = 300;
const SIDEBAR_OPEN_BORDER = 35;


@Component({
  selector: 'neo-mobile-sidebar',
  templateUrl: './mobile-sidebar.component.html',
  styleUrls: ['./mobile-sidebar.component.scss'],
  animations: [
    trigger('fadeShadow', [
      transition('CLOSED => OPEN', animate(500, keyframes(kf.fadeIn))),
      transition('OPEN => CLOSED', animate(500, keyframes(kf.fadeOut))),
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

  public showTransition = false;

  private sidebarShowSubscription: Subscription = new Subscription();


  constructor(private mobileSidebarService: MobileSidebarService,
    public router: Router) { }

  ngOnInit() {
    this.sidebarShowSubscription.add(
      this.mobileSidebarService.showSidebar.subscribe((value) => {
        if (value) {
          this.openSidebar();
        } else {
          this.closeSidebar();
        }
      }
      ));
  }

  ngOnDestroy() {
    this.sidebarShowSubscription.unsubscribe();
  }

  public closeSidebar() {
    this.showTransition = true;
    this.startX = 0;
    this.x = 0;
    this.xPrev = 0;
    setTimeout(() => {
      this.state = State.CLOSED;
      this.mobileSidebarService.isOpen = false;
    }, 250);
  }

  public openSidebar() {
    this.showTransition = true;
    this.state = State.OPEN;
    this.mobileSidebarService.isOpen = true;
    setTimeout(() => {
      this.startX = SIDEBAR_WIDTH;
      this.x = SIDEBAR_WIDTH;
      this.xPrev = SIDEBAR_WIDTH;
    });
  }

  public onTapBackdrop() {
    console.log('tap', this.state);
    if (this.state = State.OPEN) {
      this.closeSidebar();
    }
  }

  public getTranslation() {
    if (this.state === State.CLOSED) {
      return '-100%';
    } else {
      return (this.x - SIDEBAR_WIDTH) + 'px';
    }
  }

  public getOpacity() {
    const value = this.x / SIDEBAR_WIDTH;
    return value;
  }

  public showBackdrop() {
    return this.state !== State.CLOSED;
  }

  @HostListener('document:panstart', ['$event'])
  public onPanStart(event) {
    this.showTransition = false;
    if (this.state === State.CLOSED // only execute when the sidebar is closed
      && event.center.x < SIDEBAR_OPEN_BORDER // If pressed on the border
      && Math.abs(event.velocityY) < Math.abs(event.velocityX) // Swiped in the X axis more than the Y
      && event.center.x !== 0 && event.center.y !== 0 // Avoid bug of hammerJS
    ) {
      this.isTouching = true;
      this.state = State.OPENING;
      this.startX = this.x;
    } else {
      if (
        this.state === State.OPEN && Math.abs(event.velocityY) < Math.abs(event.velocityX) // Swiped in the X axis more than the Y
      ) {
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
      if (position < SIDEBAR_WIDTH) {
        this.xPrev = this.x;
        this.x = this.startX + deltaX;
      }
    }
  }

  @HostListener('document:panend', ['$event'])
  public onPanEnd(event) {
    this.isTouching = false;
    if (this.x < (SIDEBAR_WIDTH / 2)) {
      this.mobileSidebarService.showSidebar.next(false);
      this.mobileSidebarService.isOpen = false;
    } else {
      this.mobileSidebarService.showSidebar.next(true);
      this.mobileSidebarService.isOpen = true;
    }
  }

}
