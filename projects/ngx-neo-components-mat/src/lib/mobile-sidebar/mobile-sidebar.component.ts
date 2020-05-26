import { Component, HostListener } from '@angular/core';
import type { OnInit, OnDestroy } from '@angular/core';
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
    // The timeout is used to make the trasitions work as intended, first it moves the bar and then it removes the backdrop
    setTimeout(() => {
      this.state = State.CLOSED;
      this.mobileSidebarService.isOpen = false;
    }, 250);
  }

  public openSidebar() {
    this.showTransition = true;
    this.state = State.OPEN;
    this.mobileSidebarService.isOpen = true;
    // The timeout is used to generate a refresh in the view so the backdrop will appear and then the bar will transition
    setTimeout(() => {
      this.startX = SIDEBAR_WIDTH;
      this.x = SIDEBAR_WIDTH;
      this.xPrev = SIDEBAR_WIDTH;
    });
  }

  public onTapBackdrop() {
    if (this.state = State.OPEN) {
      this.mobileSidebarService.showSidebar.next(false);
    }
  }

  /**
   * Returns how much the sidebar must be moved to the left while its closed or opening/closing
   */
  public getTranslation() {
    // If it's closed it must be moved completely to the left
    if (this.state === State.CLOSED) {
      return '-100%';
    } else { // Else it will be moved between it's width and 0.
      return (this.x - SIDEBAR_WIDTH) + 'px';
    }
  }

  /**
   * Returns the opacity the backdrop should have
   */
  public getOpacity() {
    const value = this.x / SIDEBAR_WIDTH;
    return value;
  }

  /**
   * Used to verify if the backdrop should appear or not
   */
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

  /**
   * Called when the bar is being dragged
   */
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

  /**
   * Called when the bar is released
   */
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
