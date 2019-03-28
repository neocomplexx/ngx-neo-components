import { NgModule } from '@angular/core';
import { NgxNeoComponentsComponent } from './ngx-neo-components.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MobileSidebarComponent } from './mobile-sidebar/mobile-sidebar.component';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PullToRefreshComponent } from './pull-to-refresh/pull-to-refresh.component';
import { ListItemComponent } from './list-item/list-item.component';

@NgModule({
  declarations: [
    NgxNeoComponentsComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    MobileSidebarComponent,
    PullToRefreshComponent,
    ListItemComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
  ],
  exports: [
    NgxNeoComponentsComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    MobileSidebarComponent,
    PullToRefreshComponent,
    ListItemComponent
  ]
})
export class NgxNeoComponentsModule { }
