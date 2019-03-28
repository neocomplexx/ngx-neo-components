import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'neo-components';
  buttons = [
    {
      callFunction: () => {console.log('CASA'); return; },
      icon: 'fas fa-home',
      text: 'Home',
    },
    {
      callFunction: () => {console.log('Dolar'); return; },
      icon: 'fas fa-phone',
      text: 'Phone',
    },
    {
      callFunction: () => {console.log('MACRI'); return; },
      icon: 'fas fa-info-circle',
      text: 'Info',
    },
    {
      callFunction: () => {console.log('HELICOPTER'); return; },
      icon: 'fas fa-paper-plane',
      text: 'Message',
    }
  ];

  onSwipeRight(event) {
    console.log('Swipping right!');
  }

}
