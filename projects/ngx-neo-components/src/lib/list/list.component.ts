import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, AfterContentInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { ListService } from './list.service';
import { Labeled } from './list-item.component';

@Component({
  selector: 'neo-list',
  template: `
    <input *ngIf="searchBox" class="form-control" [placeholder]="searchPlaceholder" #neolistinput>
    <ng-content select="neo-list-item"></ng-content>
  `,
  providers: [ListService]
})
export class ListComponent implements OnInit, OnDestroy, AfterContentInit {

  private subs = new Subscription();

  @Input() searchBox = false;
  @Input() searchPlaceholder = 'Search...';

  @Input() activeIndex: number = null;
  @Output() activeIndexChange: EventEmitter<number> = new EventEmitter();

  @Output() focusItem: EventEmitter<Labeled> = new EventEmitter();
  @Output() leaveItem: EventEmitter<Labeled> = new EventEmitter();


  constructor(private listService: ListService) { }


  ngOnInit() {
    this.subs.add(this.listService.activeObservable.subscribe((index) => {
      this.activeIndexChange.emit(index);
    }));

    this.subs.add(this.listService.focusedObservable.subscribe((item) => {
      this.focusItem.emit(item);
    }));

    this.subs.add(this.listService.leavedObservable.subscribe((item) => {
      this.leaveItem.emit(item);
    }));
  }

  ngAfterContentInit() {
    this.listService.preSelectIndex = this.activeIndex;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.listService.preSelectIndex = null;
  }

}
