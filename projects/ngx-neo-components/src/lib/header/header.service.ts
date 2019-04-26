import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { MobileSidebarService } from '../mobile-sidebar/mobile-sidebar.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  public withoutConnection$ = new Subject<boolean>();
  requestLoad = new Subject<any>();
  loadComplete = new Subject<any>();

  public hideReturn$ = new BehaviorSubject<boolean>(true);

  constructor(protected mobileSidebarService: MobileSidebarService ) {
  }

  public getUserName(): string {
    return 'Name';
  }

  public back(): void {

  }

  public isAdmin(): boolean {
    return false;
  }

  public HandleErrorMessage(error: any, frendlyErrorMessage?: string | null): void {

  }
}
