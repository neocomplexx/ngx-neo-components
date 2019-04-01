import { Component, OnInit, Input, HostListener, Output, EventEmitter, OnDestroy, AfterContentInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ListService } from './list.service';

@Component({
  selector: 'neo-list',
  template: `
    <input *ngIf="searchBox" class="form-control" [placeholder]="searchPlaceholder" #neolistinput>
    <ng-content select="neo-list-item"></ng-content>
  `
})
export class ListComponent implements OnInit, OnDestroy, AfterContentInit {

  private subs = new Subscription();

  @Input() searchBox = false;
  @Input() searchPlaceholder = 'Search...';
  @Input() leavedIndex: number = null;
  @Output() leavedIndexChange: EventEmitter<number> = new EventEmitter();


  @HostListener('click') onClick() {
    window.alert('Host Element Clicked');
  }

  constructor(private listService: ListService) { }

  ngOnInit() {
    this.subs.add(this.listService.activeObservable.subscribe((index) => {
      console.log('EMIT AI', index);
      this.leavedIndexChange.emit(index);
    }));
  }

  ngAfterContentInit() {
    this.listService.preSelectIndex = this.leavedIndex;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.listService.preSelectIndex = null;
  }

}
