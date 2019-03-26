import { Component, OnInit, Input } from '@angular/core';
import { MobileSidebarService } from '../mobile-sidebar/mobile-sidebar.service';

@Component({
  selector: 'neo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() dropdownType: string;


  constructor(private mobileSidebarService: MobileSidebarService) { }

  ngOnInit() {
  }

  public showSidebar() {
    this.mobileSidebarService.showSidebar.next(true);
  }

}
