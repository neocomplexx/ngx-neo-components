import { Component, OnInit, Input, HostBinding, ElementRef, Output, EventEmitter } from '@angular/core';
import { Highlightable, FocusableOption } from '@angular/cdk/a11y';

@Component({
  selector: 'neo-list-item',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent<T> implements Highlightable {

  @Input() item: T;

  private _isActive = false;

  @Output() focusItem: EventEmitter<boolean> = new EventEmitter();
  @Output() leaveItem: EventEmitter<boolean> = new EventEmitter();


  @HostBinding('class.active') get isActive() {
    return this._isActive;
  }

  constructor() { }

  setActiveStyles() {
    this._isActive = true;
    this.focusItem.emit(true);
  }

  setInactiveStyles() {
    this._isActive = false;
    this.leaveItem.emit(true);
  }
}
