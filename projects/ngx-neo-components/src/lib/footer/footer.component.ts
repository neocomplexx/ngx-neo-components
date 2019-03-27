import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'neo-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() message: string;

  constructor() { }

  ngOnInit() {
  }

}
