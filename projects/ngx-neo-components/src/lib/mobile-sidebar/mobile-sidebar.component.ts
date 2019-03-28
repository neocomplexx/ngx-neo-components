import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, fromEvent, defer, timer, Observable } from 'rxjs';
import { MobileSidebarService } from './mobile-sidebar.service';
import { take, switchMap, map, repeat, tap, takeUntil, concat, takeWhile, merge, startWith, debounceTime } from 'rxjs/operators';


@Component({
  selector: 'neo-mobile-sidebar',
  templateUrl: './mobile-sidebar.component.html',
  styleUrls: ['./mobile-sidebar.component.scss']
})
export class MobileSidebarComponent implements OnInit, OnDestroy {

  public showSidebar = false;

  private sidebarShowSubscription: Subscription = new Subscription();

  constructor(private mobileSidebarService: MobileSidebarService) { }

  ngOnInit() {
    this.sidebarShowSubscription.add(
      this.mobileSidebarService.showSidebar.subscribe((value) => {
        console.log(this.showSidebar, value);
        this.showSidebar = value;
    }));
  }

  ngOnDestroy() {
    this.sidebarShowSubscription.unsubscribe();
  }

  public closeSidebar() {
    this.mobileSidebarService.showSidebar.next(false);
  }

}
