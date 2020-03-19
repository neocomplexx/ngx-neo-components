import { ICommand, Command } from '@neocomplexx/ngx-neo-directives';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Component, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { HeaderService, MobileSidebarService, Labeled, ListComponent } from 'ngx-neo-components-mat';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.mat.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {


 @ViewChild('listC', { static: true }) listC: ListComponent;

  public personList: Array<Person>;
  public notifications: Array<Notification>;

  public userSearch = '';

  public model;

  // Keyboard list section
  users = new Array<User>();
  usersAux = new Array<User>();
  public lastIndexSelected = 1232;
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
  //  public showUndo: boolean;
  public actionText: string;
  public undoMessage: string;
  public undoTimeOutLapse: number;
  public notificacionObtenida: Notification;
  public notificationSwipeRight: boolean;

  public isMobile = false;
  public resizeSubscription: Subscription = new Subscription();

  public date = new Date();
//  public ngbDate = new NgbDate(2019, 5, 1);

  constructor(
    private mobileSidebarService: MobileSidebarService,
    private breakpointObserver: BreakpointObserver
  ) {

    this.resizeSubscription.add(breakpointObserver.observe([
      Breakpoints.Small,
      Breakpoints.XSmall
    ]).subscribe(result => {
      if (result.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    }));

   setTimeout(() => {// Emulate async init
      const aux = Array.from(
        ['One name', 'Two name', 'Three name', 'Fourteen name', 'Hello name', 'Two name', 'Three name', 'Fourteen name',
          'Hello name', 'Hello name', 'Hola name', 'One name', 'One name', 'Two name', 'Three name', 'Fourteen name',
          'Hello name', 'Two name', 'Three name','One name', 'Two name', 'Three name', 'Fourteen name', 'Hello name', 'Two name', 'Three name', 'Fourteen name',
          'Hello name', 'Hello name', 'Hola name', 'One name', 'One name', 'Two name', 'Three name', 'Fourteen name',
          'Hello name', 'Two name', 'Three name','One name', 'Two name', 'Three name', 'Fourteen name', 'Hello name', 'Two name', 'Three name', 'Fourteen name',
          'Hello name', 'Hello name', 'Hola name', 'One name', 'One name', 'Two name', 'Three name', 'Fourteen name',
          'Hello name', 'Two name', 'Three name','One name', 'Two name', 'Three name', 'Fourteen name', 'Hello name', 'Two name', 'Three name', 'Fourteen name',
          'Hello name', 'Hello name', 'Hola name', 'One name', 'One name', 'Two name', 'Three name', 'Fourteen name',
          'Hello name', 'Two name', 'Three name','One name', 'Two name', 'Three name', 'Fourteen name', 'Hello name', 'Two name', 'Three name', 'Fourteen name',
          'Hello name', 'Hello name', 'Hola name', 'One name', 'One name', 'Two name', 'Three name', 'Fourteen name',
          'Hello name', 'Two name', 'Three name'],
        x => new User(x));
      aux.forEach(x => {
        this.users.push(x);
        this.usersAux.push(x);
      });
      this.usersAux = [...this.usersAux];
    }, 2000);

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
    // this.showUndo = false;
    this.actionText = 'Deshacer';
    this.undoMessage = '1 archivada';
    this.undoTimeOutLapse = 5000;

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

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
  }

  private testCommand(user: User) {
    console.log('Command execution:', user);
  }

  public onActive(user) {
    console.log('over:', user);
  }

  public onDeactive(user: User) {
    console.log('leaver:', user);
  }


  public onNotifySwipeRight(notif: Notification) {
    this.notificacionObtenida = notif;
    this.undoMessage = '1 archivada';
    this.notificacionObtenida.show = false;
    this.notificationSwipeRight = true;
  }

  public onNotifySwipeLeft(notif: Notification) {
    this.notificacionObtenida = notif;
    this.undoMessage = '1 eliminada';
    this.notificacionObtenida.show = false;
    this.notificationSwipeRight = false;
  }

  public onUndo = () => {
    if (this.notificationSwipeRight) {
      this.undoSwipeRight();
    } else {
      this.undoSwipeLeft();
    }
  }

  public undoTimeOut = () => {
    if (this.notificationSwipeRight) {
      this.finishActionSwipeRight();
    } else {
      this.finishActionSwipeLeft();
    }
  }

  // Estos métodos harían las llamadas al backend correspondientes
  public finishActionSwipeRight() {

    // console.log ('Finish action swipe right.');
  }
  public finishActionSwipeLeft() {
  }

  public undoSwipeRight() {
    this.notificacionObtenida.show = true;
    //  this.notificacionObtenida = undefined;
    this.listC.index = 1;
  }
  public undoSwipeLeft() {
    this.notificacionObtenida.show = true;
    //  this.notificacionObtenida = undefined;
  }

  @HostListener('swipeleft', ['$event'])
  public hideSidebar($event) {
    this.mobileSidebarService.showSidebar.next(false);
  }

  onSorted($event) {
    this.getPeople($event);
  }

  getPeople(criteria: PersonSearchCriteria): Person[] {
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


  public openModal(): void {
   // const modalRef = this.modalService.open(PopUpPruebaComponent, { size: 'lg', windowClass: 'modal-xxl', backdrop: 'static' });
  }

  public openModalLarge(): void {
  //  const modalRef = this.modalService.open(PopUpPruebaLargoComponent, { size: 'lg', windowClass: 'modal-xxl', backdrop: 'static' });
  }

  public onKeyDown(): void {
    this.usersAux = this.users.filter( (user) => {
      return user.name.toLowerCase().includes(this.userSearch.toLowerCase(), 0);
    });
    console.log(this.userSearch);
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
