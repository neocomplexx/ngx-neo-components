import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header/header.service';

@Component({
  selector: 'neo-connection-checker',
  templateUrl: './connection-checker.component.html',
  styleUrls: ['./connection-checker.component.css']
})
export class ConnectionCheckerComponent implements OnInit {

  constructor(public headerService: HeaderService) { }

  ngOnInit() {
  }

}
