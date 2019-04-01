import { NgModule } from '@angular/core';
import { NgxNeoComponentsComponent } from './ngx-neo-components.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MobileSidebarComponent } from './mobile-sidebar/mobile-sidebar.component';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PullToRefreshComponent } from './pull-to-refresh/pull-to-refresh.component';
import { ListItemComponent } from './list/list-item.component';
import { ListComponent } from './list/list.component';
import { SliderComponent } from './slider/slider.component';
import { ListKeydownDirective } from './list/list-keydown.directive';
import { SortableTableComponent } from './sortable-table/sortable-table.component';

@NgModule({
  declarations: [
    NgxNeoComponentsComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    MobileSidebarComponent,
    PullToRefreshComponent,
    ListItemComponent,
    ListComponent,
    ListKeydownDirective,
    SliderComponent,
    SortableTableComponent
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
    ListItemComponent,
    ListComponent,
    ListKeydownDirective,
    SliderComponent,
    SortableTableComponent
  ]
})
export class NgxNeoComponentsModule { }
