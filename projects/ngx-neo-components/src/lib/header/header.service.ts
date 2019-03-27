import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  public sinConexion$ = new Subject<boolean>();
  requestLoad = new Subject<any>();
  loadComplete = new Subject<any>();

  constructor() { }
}
