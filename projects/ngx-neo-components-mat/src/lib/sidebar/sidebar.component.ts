import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarService } from './sidebar.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'neo-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  public open: boolean;
  public isMobile: boolean;

  constructor(private sidebarService: SidebarService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.subs.add(this.sidebarService.openSate$.subscribe((state) => {
      this.open = state;
    }))
    .add(this.breakpointObserver.observe([
      Breakpoints.Small,
      Breakpoints.XSmall
    ]).subscribe(result => {
      if (result.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    }));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
