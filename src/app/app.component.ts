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
      icon: 'fas fa-comments-dollar',
      text: 'Home',
    },
    {
      callFunction: () => {console.log('MACRI'); return; },
      icon: 'fas fa-cat',
      text: 'Macri',
    },
    {
      callFunction: () => {console.log('HELICOPTER'); return; },
      icon: 'fas fa-helicopter',
      text: 'Go Home',
    }
  ];

}
