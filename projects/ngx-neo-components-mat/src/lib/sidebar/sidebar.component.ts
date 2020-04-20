import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'neo-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  public open: boolean;

  constructor(private sidebarService: SidebarService) { }

  ngOnInit() {
    this.subs.add(this.sidebarService.openSate$.subscribe((state) => {
      this.open = state;
    }));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
