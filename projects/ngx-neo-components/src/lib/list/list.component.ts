import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'neo-list',
  template: `
    <input *ngIf="searchBox" class="form-control" [placeholder]="searchPlaceholder" #input>
    <ng-content select="neo-list-item"></ng-content>
  `
})
export class ListComponent implements OnInit {

  @Input() searchBox = false;
  @Input() searchPlaceholder = 'Search...';

  constructor() { }

  ngOnInit() {
  }

}
