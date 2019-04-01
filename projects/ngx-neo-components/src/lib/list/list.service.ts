import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ListItemComponent, Labeled } from './list-item.component';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { ICommand } from '@neocomplexx/ngx-neo-directives';

@Injectable()
export class ListService implements OnDestroy {

  /**
   * This service is used to mantain a state and comunication between list directive and components
   *
   * activeObservable is emitted when an element is set to active. Then we can emit the selected index outside the component
   *
   * clickedObservable is emitted when an elment in list is clicked, is used by the directive to update the selected index
   *
   * focused and clicked are emitted from elements to list so neo-list can emitt to the outside
   *
   * We keep preSelected to indicate to directive if an item has to be pre selected after list is loaded.
   */
  private _preSelectIndex: number = null;

  private _keyManager: ActiveDescendantKeyManager<ListItemComponent<Labeled>>;

  private _command: ICommand;

  public activeObservable = new Subject<number>();

  public clickedObservable = new Subject<ListItemComponent<Labeled>>();

  public focusedObservable = new Subject<Labeled>();

  public leavedObservable = new Subject<Labeled>();

  get preSelectIndex(): number { return this._preSelectIndex; }
  set preSelectIndex(value: number) { this._preSelectIndex = value; }

  get keyManager(): ActiveDescendantKeyManager<ListItemComponent<Labeled>> { return this._keyManager; }
  set keyManager(value: ActiveDescendantKeyManager<ListItemComponent<Labeled>>) { this._keyManager = value; }

  get command(): ICommand { return this._command; }
  set command(value: ICommand) { this._command = value; }

  constructor() { console.log('cons'); }

  public keyListenerFunc(event: KeyboardEvent, itemsLength: number) {
    if (this._keyManager) {
      const active = this._keyManager.activeItemIndex;
      switch (event.keyCode) {
        case 13:
          if (this.command) {
            if (this._keyManager.activeItem) {
              this.command.execute(this._keyManager.activeItem.item);
            } else {
              console.warn('Not selected item');
            }
          }
          break;
        case 33:
          event.preventDefault();
          if (this._keyManager.activeItemIndex - 10 >= 0) {
            this._keyManager.setActiveItem(active - 10);
          } else {
            this._keyManager.setFirstItemActive();
          }
          break;
        case 34:
          event.preventDefault();
          if (this._keyManager.activeItemIndex + 10 < itemsLength) {
            this._keyManager.setActiveItem(active + 10);
          } else {
            this._keyManager.setLastItemActive();
          }
          break;
        case 35:
          this._keyManager.setLastItemActive();
          break;
        case 36:
          this._keyManager.setFirstItemActive();
          break;
        default:
          this._keyManager.onKeydown(event);
      }
      this.activeObservable.next(this._keyManager.activeItemIndex);
    } else {
      throw Error('keyManager was not setted in neoListKeydown');
    }
  }

  ngOnDestroy() {
    this._command = null;
    this._keyManager = null;
    this._preSelectIndex = null;
  }
}
