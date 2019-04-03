import { Component, Input, HostBinding, HostListener } from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';
import { ListService } from './list.service';

@Component({
  selector: 'neo-list-item',
  template: `<ng-content></ng-content>`
})
export class ListItemComponent<T extends Labeled> implements Highlightable {

  @Input() item: T;

  private _isActive = false;


  @HostBinding('class.active') get isActive() {
    return this._isActive;
  }

  @HostListener('click', ['item', '$event'])
  onClick(item: this, $event: MouseEvent) {
    this.listService.skipInactive = true;
    this.listService.clickedObservable.next(item);
  }

  constructor(private listService: ListService) { }

  public setActiveStyles() {
    this._isActive = true;
    this.listService.focusedObservable.next(this.item);
  }

  public setInactiveStyles() {
    this._isActive = false;
    this.listService.leavedObservable.next(this.item);
  }

  public getLabel() {
    return this.item.getLabel();
  }
}

export interface Labeled {
  getLabel(): string;
  toString(): string;
}

