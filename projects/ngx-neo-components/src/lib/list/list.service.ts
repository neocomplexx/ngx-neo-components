import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  /**
   * This service is used to mantain a state and comunication between list directive and components
   *
   * Active is emitted when an element is set to active. Then we can emit the selected index outside the component
   * We keep preSelected to indicate to directive if an item has to be pre selected after list is loaded.
   */
  private _preSelectIndex: number = null;

  public activeObservable = new Subject<number>();

  get preSelectIndex(): number { return this._preSelectIndex; }
  set preSelectIndex(value: number) { this._preSelectIndex = value; }

  constructor() { }
}
