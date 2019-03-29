import { Component, ViewChildren, QueryList, AfterViewInit, HostBinding, HostListener } from '@angular/core';
import { ListItemComponent, HeaderService } from 'ngx-neo-components';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { ENTER } from '@angular/cdk/keycodes';
import { MobileSidebarService } from 'ngx-neo-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {

  @ViewChildren(ListItemComponent) items: QueryList<ListItemComponent<User>>;

  // tslint:disable-next-line:max-line-length
  users: User[] = [{ name: 'One name' }, { name: 'Two name' }, { name: 'Three name' }, { name: 'Fourteen name' }, { name: 'Hello name' }, { name: 'Hello name' }, { name: 'Hola name' }];

  public selected: User;

  private keyManager: ActiveDescendantKeyManager<ListItemComponent<User>>;

  title = 'neo-components';
  buttons = [
    {
      callFunction: () => { console.log('Home'); return; },
      icon: 'fas fa-home',
      text: 'Home',
    },
    {
      callFunction: () => { console.log('Phone'); return; },
      icon: 'fas fa-phone',
      text: 'Phone',
    },
    {
      callFunction: () => { console.log('Info'); return; },
      icon: 'fas fa-info-circle',
      text: 'Info',
    },
    {
      callFunction: () => { console.log('Message'); return; },
      icon: 'fas fa-paper-plane',
      text: 'Message',
    }
  ];

  constructor(private headerService: HeaderService, private mobileSidebarService: MobileSidebarService) {
  }

  ngAfterViewInit() {
    this.keyManager = new ActiveDescendantKeyManager(this.items)
      .withWrap();
  }

  public onKeydown(event) {
    if (event.keyCode === ENTER) {
      this.selected = this.keyManager.activeItem.item;
      window.alert(this.selected.name);
    } else {
      this.keyManager.onKeydown(event);
    }
  }

  public onActive(user: User) {
    console.log('over:', user);
  }

  public onNotify(event) {
    console.log(event, 'ON NOTIFY');
  }

  @HostListener('swipeleft', ['$event'])
  public hideSidebar($event) {
    this.mobileSidebarService.showSidebar.next(false);
  }

  @HostListener('swiperight', ['$event'])
  public showSidebar($event) {
    this.mobileSidebarService.showSidebar.next(true);
  }


}

export interface User {
  name: string;



}
