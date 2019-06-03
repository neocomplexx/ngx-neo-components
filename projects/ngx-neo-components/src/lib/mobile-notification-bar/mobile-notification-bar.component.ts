import { Component, OnInit, HostListener } from '@angular/core';
import { trigger, transition, animate, keyframes } from '@angular/animations';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MobileNotificationBarService } from './mobile-notification-bar.service';
import * as kf from '../shared/animations/keyframes';


enum State {
  OPENING = 'OPENING',
  CLOSING = 'CLOSING',
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

const SIDEBAR_WIDTH = 300;
const SIDEBAR_OPEN_BORDER = 35;

@Component({
  selector: 'neo-mobile-notification-bar',
  templateUrl: './mobile-notification-bar.component.html',
  styleUrls: ['./mobile-notification-bar.component.css'],
  animations: [
    trigger('fadeShadow', [
      transition('CLOSED => OPEN', animate(500, keyframes(kf.fadeIn))),
      transition('OPEN => CLOSED', animate(500, keyframes(kf.fadeOut))),
    ]),
  ]
})
export class MobileNotificationBarComponent implements OnInit {

  public showSidebar = false;
  public currentWidth = window.screen.availWidth;
  public x = this.currentWidth;
  public startX = this.currentWidth;
  public xPrev = this.currentWidth;

  public isTouching = false;

  public state: State = State.CLOSED;

  public showTransition = false;

  private sidebarShowSubscription: Subscription = new Subscription();


  constructor(private mobileSidebarService: MobileNotificationBarService,
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
    this.startX = this.currentWidth;
    this.x = this.currentWidth;
    this.xPrev = this.currentWidth;
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
      this.startX = this.currentWidth - SIDEBAR_WIDTH;
      this.x = this.currentWidth - SIDEBAR_WIDTH;
      this.xPrev = this.currentWidth - SIDEBAR_WIDTH;
    });
  }

  public onTapBackdrop() {
    if (this.state = State.OPEN) {
      this.closeSidebar();
    }
  }

  public getTranslation() {
    if (this.state === State.CLOSED) {
      return '-100%';
    } else {
      return ((this.currentWidth - this.x) - SIDEBAR_WIDTH) + 'px';
    }
  }

  public getOpacity() {
    const value = (this.currentWidth - this.x) / SIDEBAR_WIDTH;
    return value;
  }

  public showBackdrop() {
    return this.state !== State.CLOSED;
  }

  @HostListener('document:panstart', ['$event'])
  public onPanStart(event) {
    this.showTransition = false;
    if (this.state === State.CLOSED // only execute when the sidebar is closed
      && (this.currentWidth - event.center.x) < SIDEBAR_OPEN_BORDER // If pressed on the border
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
      if ((this.currentWidth - position) < SIDEBAR_WIDTH) {
        this.xPrev = this.x;
        this.x = this.startX + deltaX;
      }
    }
  }

  @HostListener('document:panend', ['$event'])
  public onPanEnd(event) {
    this.isTouching = false;
    if ((this.currentWidth - this.x) < (SIDEBAR_WIDTH / 2)) {
      this.mobileSidebarService.showSidebar.next(false);
      this.mobileSidebarService.isOpen = false;
    } else {
      this.mobileSidebarService.showSidebar.next(true);
      this.mobileSidebarService.isOpen = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.currentWidth = window.screen.availWidth;
    this.closeSidebar();
  }

}
