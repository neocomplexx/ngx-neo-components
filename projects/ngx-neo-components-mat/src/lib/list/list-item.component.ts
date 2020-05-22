import { Component, Input, HostBinding, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';
import { ListService } from './list.service';

@Component({
  selector: 'neo-list-item',
  template: `<ng-content></ng-content>`
})
export class ListItemComponent<T extends Labeled> implements Highlightable {

  @Input() item: T;

  private _isActive = false;

  @HostBinding('attr.tabindex') tabindex = -1;

  @HostBinding('class.active') get isActive() {
    return this._isActive;
  }

  @HostListener('click', ['item'])
  onClick(item: this) {
    this.listService.clickedObservable.next(item);
  }

  constructor(private listService: ListService, private hostElement: ElementRef, private renderer: Renderer2) { }

  public setActiveStyles() {
    this._isActive = true;
    this.renderer.selectRootElement(this.hostElement.nativeElement, true).focus();
    this.listService.focusedObservable.next(this.item);
  }

  public setInactiveStyles() {
    this._isActive = false;
    this.listService.leavedObservable.next(this.item);
  }

  public getLabel() {
    return this.item.getLabel ? this.item.getLabel() : this.item.toString();
  }
}

export interface Labeled {
  getLabel(): string;
  toString(): string;
}

