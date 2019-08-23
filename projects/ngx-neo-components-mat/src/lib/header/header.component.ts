import { Component, OnInit, Input, HostBinding, ViewChild } from '@angular/core';
import { MobileSidebarService } from '../mobile-sidebar/mobile-sidebar.service';
import { Router } from '@angular/router';
import { NotificationService } from './notification/notification.service';
import { HeaderService } from './header.service';
import { Subscription } from 'rxjs';
import { SidebarService } from '../sidebar/sidebar.service';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'neo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() dropdownType: string;
  @Input() public colapsableSidebar = false;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(private mobileSidebarService: MobileSidebarService,
    public router: Router, public notificationService: NotificationService, 
    private sidebarSerive:SidebarService, public headerService: HeaderService) {
  }

  ngOnInit() {
  }

  public showSidebar() { console.log('Entre aca :)');
    this.mobileSidebarService.showSidebar.next(true);

  }

  public toggleSidebar() {
    this.sidebarSerive.toggleSidebar.next();
  }

  public clearBell() {
    this.notificationService.ClearBell();
  }

  public getName() {
    return this.headerService.getUserName();
  }

  public back() {
    this.headerService.back();
  }

  public isAdmin(): boolean {
    return this.headerService.isAdmin();
  }

  someMethod() {
    this.trigger.openMenu();
  }
}
