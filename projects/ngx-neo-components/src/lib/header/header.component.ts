import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { MobileSidebarService } from '../mobile-sidebar/mobile-sidebar.service';
import { Router } from '@angular/router';
import { NotificationService } from './notification/notification.service';

@Component({
  selector: 'neo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() dropdownType: string;

  @Input() set iosHeader(value: boolean) {
    this.setIosHeader = value;
  }

  @HostBinding('class.ios-header') setIosHeader = false;


  constructor(private mobileSidebarService: MobileSidebarService,
    private router: Router, public notificationService: NotificationService) { }

  ngOnInit() {
  }

  public showSidebar() {
    this.mobileSidebarService.showSidebar.next(true);
  }

  public vaciarCampanita() {

  }
}
