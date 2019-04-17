import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { MobileSidebarService } from '../mobile-sidebar/mobile-sidebar.service';
import { Router } from '@angular/router';
import { NotificationService } from './notification/notification.service';
import { HeaderService } from './header.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'neo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() dropdownType: string;

/*   @Input() iosHeader = false;

  @HostBinding('class.ios-header') setIosHeader() {
    return this.iosHeader;
  } */

  constructor(private mobileSidebarService: MobileSidebarService,
    public router: Router, public notificationService: NotificationService, public headerService: HeaderService) {
  }

  ngOnInit() {
  }

  public showSidebar() {
    this.mobileSidebarService.showSidebar.next(true);
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
}
