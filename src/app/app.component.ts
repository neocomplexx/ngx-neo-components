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


  public personList: Array<Person>;
  public notifications: Array<Notification>;

  // Keyboard list section
  users = new Array<User>();
  public lastIndexSelected = 2;
  public selected: User;
  public testItemCmd: ICommand = new Command((value) => this.testCommand(value), new BehaviorSubject(true), false);





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

  // Undo atributes
  public showUndo: boolean;
  public actionText: string;
  public undoMessage: string;
  public notificacionObtenida: Notification;
  public notificationSwipeRight: boolean;

  constructor(private headerService: HeaderService, private mobileSidebarService: MobileSidebarService) {

    setTimeout(() => {// Emulate async init
      const aux = Array.from(
        ['One name', 'Two name', 'Three name', 'Fourteen name', 'Hello name', 'Hello name', 'Hola name','One name', 'Two name', 'Three name', 'Fourteen name', 'Hello name', 'Hello name', 'Hola name'],
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

    // Undo atributes
    this.showUndo = false;
    this.actionText = 'Deshacer';
    this.undoMessage = '1 archivada';

    // Notificaciones
    this.notifications = new Array<Notification>();
    const notification = new Notification();
    notification.show = true;
    notification.text = 'Soy una notificacion con swipe';
    this.notifications.push(notification);
    const notification2 = new Notification();
    notification2.show = true;
    notification2.text = 'Soy otra notificacion con swipe';
    this.notifications.push(notification2);
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

  public onNotifySwipeRight(event, notif: Notification) {
    console.log(event, 'ON NOTIFY');

    setTimeout(() => {
      this.showUndo = true;
      this.undoMessage = '1 archivada';
      notif.show = false;
      this.notificacionObtenida = notif;
      this.notificationSwipeRight = true;
    }, 500);

    // setTimeout(() => {
    //   console.log('Timeout para el mensaje undo');
    //   this.showUndo = false;
    //   this.finishActionSwipeRight();
    // }, 5000);
  }

  public onNotifySwipeLeft(event, notif: Notification) {
    console.log(event, 'ON NOTIFY');

    setTimeout(() => {
      this.showUndo = true;
      this.undoMessage = '1 eliminada';
      notif.show = false;
      this.notificacionObtenida = notif;
      this.notificationSwipeRight = false;
      console.log('Time out show undo');
    }, 500);

    // setTimeout(() => {
    //   console.log('Timeout para el mensaje undo');
    //   this.showUndo = false;
    //   this.finishActionSwipeLeft();
    // }, 5000);
  }

  public onUndo(event) {
    console.log(event, 'UNDO');

    //  this.showUndo = false;
    if (this.notificationSwipeRight) {
      this.undoSwipeRight();
    } else {
      this.undoSwipeLeft();
    }
  }

  // Estos métodos harían las llamadas al backend correspondientes
  public finishActionSwipeRight() {
    window.alert('El sistema informa que se terminó la accion del swipe right.');
  }
  public finishActionSwipeLeft() {
    window.alert('El sistema informa que se terminó la accion del swipe left.');
  }

  public undoSwipeRight() {
    // window.alert('Deshago swipe right');
    this.notificacionObtenida.show = true;
    this.showUndo = false;
  }
  public undoSwipeLeft() {
    // window.alert('Deshago swipe left');
    this.notificacionObtenida.show = true;
    this.showUndo = false;
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

export class Notification {
  text: string;
  show: boolean;
}
