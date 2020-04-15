import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService implements OnDestroy {

  public toggleSidebar: Subject<any> = new Subject();

  private openSate = new BehaviorSubject<boolean>(true);
  public openSate$ = this.openSate.asObservable();

  private subs = new Subscription();

  constructor() {
    this.subs.add(this.toggleSidebar.subscribe(() => {
      const state = this.openSate.getValue();
      this.openSate.next(!state);
    }));
  }

  public closeSidebar() {
    this.openSate.next(false);
  }

  public openSidebar() {
    this.openSate.next(true);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
