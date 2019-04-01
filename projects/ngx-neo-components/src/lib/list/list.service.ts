import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ListItemComponent, Labeled } from './list-item.component';

@Injectable({
  providedIn: 'root'
})
export class ListService {

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

  public activeObservable = new Subject<number>();

  public clickedObservable = new Subject<ListItemComponent<Labeled>>();

  public focusedObservable = new Subject<Labeled>();

  public leavedObservable = new Subject<Labeled>();

  get preSelectIndex(): number { return this._preSelectIndex; }
  set preSelectIndex(value: number) { this._preSelectIndex = value; }

  constructor() { }
}
