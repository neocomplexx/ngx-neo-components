import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobileSidebarService {

  public showSidebar: Subject<boolean> = new Subject<boolean>();

  constructor() { }
}
