import { ICommand, Command } from '@neocomplexx/ngx-neo-directives';
import { BehaviorSubject } from 'rxjs';
import { Component, ViewChildren, QueryList, AfterViewInit, HostBinding, HostListener } from '@angular/core';
import { HeaderService, MobileSidebarService, Labeled } from 'ngx-neo-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  // tslint:disable-next-line:max-line-length
  users = new Array<User>();

  public personList: Array<Person>;

  public testItemCmd: ICommand = new Command((value) => this.testCommand(value), new BehaviorSubject(true), false);

  public selected: User;

  public lastIndexSelected = 2;

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

    setTimeout(() => {// Emulate async init
      const aux = Array.from(
        ['One name', 'Two name', 'Three name', 'Fourteen name', 'Hello name', 'Hello name', 'Hola name'],
        x => new User(x));
      aux.forEach(x => {
        this.users.push(x);
      });
    }, 3000);

    this.personList = new Array<Person>();

    const person: Person = new Person();
    person.name = 'Bruce';
    person.lastname = 'Wayne';
    person.age = 40;
    this.personList.push(person);
    const person2 = new Person();
    person2.name = 'Richard';
    person2.lastname = 'Grayson';
    person2.age = 20;
    this.personList.push(person2);
  }

  private testCommand(user: User) {
    console.log('Command execution:', user);
  }
  public onActive(user: User) {
    console.log('over:', user);
  }

  public onDeactive(user: User) {
    console.log('leaver:', user);
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

class User implements Labeled {
  name: string;

  constructor(name: string) { this.name = name; }

  getLabel() {
    return this.name;
  }

}

class Person {
  name: string;
  lastname: string;
  age: number;
}
