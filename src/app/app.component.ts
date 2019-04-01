import { ICommand, Command } from '@neocomplexx/ngx-neo-directives';
import { BehaviorSubject } from 'rxjs';
import { Component, HostListener } from '@angular/core';
import { HeaderService, MobileSidebarService, Labeled } from 'ngx-neo-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

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
    const person3 = new Person();
    person3.name = 'Barbara';
    person3.lastname = 'Gordon';
    person3.age = 26;
    this.personList.push(person3);

    this.getPeople({ sortColumn: 'age', sortDirection: 'desc' });
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

  onSorted($event) {
    this.getPeople($event);
  }

  getPeople(criteria: PersonSearchCriteria): Person[] {
    console.log(criteria);
    return this.personList.sort((a, b) => {
      if (criteria.sortDirection === 'desc') {
        if (a[criteria.sortColumn] < b[criteria.sortColumn]) {
          return 1;
        } else if (a[criteria.sortColumn] > b[criteria.sortColumn]) {
          return -1;
        } else { return 0; }
      } else { // asc
        if (a[criteria.sortColumn] > b[criteria.sortColumn]) {
          return 1;
        } else if (a[criteria.sortColumn] < b[criteria.sortColumn]) {
          return -1;
        } else {
          return 0;
        }
      }
    });
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

export class PersonSearchCriteria {
  sortColumn: string;
  sortDirection: string;
}
