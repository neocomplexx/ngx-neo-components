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
import { SortableTableDirective } from './sortable-table/sortable-table.directive';
import { SortableColumnComponent } from './sortable-table/sortable-column.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { UndoComponent } from './undo-component/undo.component';
import { UndoElementsDirective } from './undo-component/undo-elements.directive';
import { StepperComponent } from './stepper/stepper.component';
import { StepComponent } from './stepper/step/step.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepHeaderComponent } from './stepper/step-header/step-header';
import { RouterModule } from '@angular/router';
import { ConnectionCheckerComponent } from './connection-checker/connection-checker.component';
import { FormsModule } from '@angular/forms';

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
    SortableTableDirective,
    SortableColumnComponent,
    DatepickerComponent,
    UndoComponent,
    UndoElementsDirective,
    StepperComponent,
    StepComponent,
    StepHeaderComponent,
    ConnectionCheckerComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    CdkStepperModule,
    RouterModule,
    FormsModule
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
    SortableTableDirective,
    SortableColumnComponent,
    DatepickerComponent,
    UndoComponent,
    UndoElementsDirective,
    StepperComponent,
    StepComponent,
    ConnectionCheckerComponent
  ]
})
export class NgxNeoComponentsModule { }
