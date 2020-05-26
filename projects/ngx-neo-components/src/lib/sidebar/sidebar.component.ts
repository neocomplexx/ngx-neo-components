import { Component } from '@angular/core';
import type { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'neo-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  public open = true;

  constructor(private sidebarService: SidebarService) { }

  ngOnInit() {
    this.subs.add(this.sidebarService.toggleSidebar.subscribe(() => {
      this.open = !this.open;
    }));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
