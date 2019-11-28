import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, AfterContentInit, HostBinding, HostListener } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { ListService } from './list.service';
import { Labeled } from './list-item.component';

@Component({
  selector: 'neo-list',
  template: `
  <ng-content></ng-content>
  <cdk-virtual-scroll-viewport itemSize="itemHeightSize" class="scrollViewport">
    <ng-content select="[items-container]"></ng-content>
  </cdk-virtual-scroll-viewport>
  `,
  providers: [ListService]
})
export class ListComponent implements OnInit, OnDestroy, AfterContentInit {

  public set index(i: number) {
    const timerObj = timer(5);
    this.subs.add(timerObj.subscribe(() => {
      this.listService.keyManager.setActiveItem(i);
      this.listService.emitSelectedIndex();
      this.listService.executeCommand();
    }));
  }


  @HostBinding('attr.tabindex') tabindex = -1;

  private subs = new Subscription();

  @Input() activeIndex: number = null;
  @Output() activeIndexChange: EventEmitter<number> = new EventEmitter();

  @Output() focusItem: EventEmitter<Labeled> = new EventEmitter();
  @Output() leaveItem: EventEmitter<Labeled> = new EventEmitter();

  @Input() itemHeightSize = 50; // In pixels

  @HostListener('keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.listService.keyListenerFunc(event);
  }

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
