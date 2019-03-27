import { Component, OnInit, Input } from '@angular/core';

export interface IFooterConfigItem {
  callFunction: any;
  icon: string;
  text: string;
}

@Component({
  selector: 'neo-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() message: string;

  @Input() smButtons: IFooterConfigItem [];

  @Input() border = false;

  constructor() { }

  ngOnInit() {
  }

}
