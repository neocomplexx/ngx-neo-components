import { Component, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { ListItemComponent } from 'ngx-neo-components';
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
  users: User[] = [{ name: 'One name' }, { name: 'Two name' }, { name: 'Three name' }, { name: 'Fourteen name' }, { name: 'Hello name' }, { name: 'Hello name' }, { name: 'Hola name' }];

  public selected: User;

  private keyManager: ActiveDescendantKeyManager<ListItemComponent<User>>;

  title = 'neo-components';
  buttons = [
    {
      callFunction: () => { console.log('CASA'); return; },
      icon: 'fas fa-home',
      text: 'Home',
    },
    {
      callFunction: () => { console.log('Dolar'); return; },
      icon: 'fas fa-comments-dollar',
      text: 'Home',
    },
    {
      callFunction: () => { console.log('MACRI'); return; },
      icon: 'fas fa-cat',
      text: 'Macri',
    },
    {
      callFunction: () => { console.log('HELICOPTER'); return; },
      icon: 'fas fa-helicopter',
      text: 'Go Home',
    }
  ];

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
    console.log('over:',user);
  }

}

export interface User {
  name: string;
}
