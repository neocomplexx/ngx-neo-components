import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobileNotificationBarService {

  public showSidebar: Subject<boolean> = new Subject<boolean>();
  public isOpen: boolean;

  constructor() { }
}
