import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { MobileSidebarService } from '../mobile-sidebar/mobile-sidebar.service';

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


  constructor(private mobileSidebarService: MobileSidebarService) { }

  ngOnInit() {
  }

  public showSidebar() {
    this.mobileSidebarService.showSidebar.next(true);
  }

}
