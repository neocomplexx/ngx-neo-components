import { Component, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { ListItemComponent, Labeled } from 'ngx-neo-components';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChildren(ListItemComponent) items: QueryList<ListItemComponent<User>>;

  // tslint:disable-next-line:max-line-length
  users: User[];

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

  constructor() {

    this.users = Array.from(
      ['One name', 'Two name', 'Three name', 'Fourteen name', 'Hello name', 'Hello name', 'Hola name'],
      x => new User(x));
  }

  ngAfterViewInit() {
    this.keyManager = new ActiveDescendantKeyManager(this.items)
      .withWrap()
      .withTypeAhead();
  }

  onSwipeRight(event) {
    console.log('Swipping right!');
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

}

class User implements Labeled {
  name: string;

  constructor(name: string) { this.name = name; }

  getLabel() {
    return this.name;
  }

}
