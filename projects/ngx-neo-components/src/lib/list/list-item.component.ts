import { Component, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';
import { ListService } from './list.service';

@Component({
  selector: 'neo-list-item',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent<T extends Labeled> implements Highlightable {

  @Input() item: T;

  private _isActive = false;

  @Output() focusItem: EventEmitter<boolean> = new EventEmitter();
  @Output() leaveItem: EventEmitter<boolean> = new EventEmitter();


  @HostBinding('class.active') get isActive() {
    return this._isActive;
  }

  constructor() { }

  public setActiveStyles() {
    this._isActive = true;
    this.focusItem.emit(true);
  }

  public setInactiveStyles() {
    this._isActive = false;
    this.leaveItem.emit(true);
  }

  public getLabel() {
    return this.item.getLabel();
  }
}

export interface Labeled {
  getLabel(): string;
  toString(): string;
}

