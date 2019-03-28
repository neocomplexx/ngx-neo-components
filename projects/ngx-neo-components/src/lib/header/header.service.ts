import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { MobileSidebarService } from '../mobile-sidebar/mobile-sidebar.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  public sinConexion$ = new Subject<boolean>();
  requestLoad = new Subject<any>();
  loadComplete = new Subject<any>();

  private _sideShow = new BehaviorSubject(false);
  public sideShow = this._sideShow.asObservable();

  constructor(private mobileSidebarService: MobileSidebarService ) { }

  public sideNavHide() {
   // this._sideShow.next(false);
    this.mobileSidebarService.showSidebar.next(false);
  }

  public sideNavShow() {
  //  this._sideShow.next(true);
    this.mobileSidebarService.showSidebar.next(true);
  }
}
