import { NgModule } from '@angular/core';
import { NgxNeoComponentsComponent } from './ngx-neo-components.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MobileSidebarComponent } from './mobile-sidebar/mobile-sidebar.component';
import { CommonModule } from '@angular/common';
import { PullToRefreshComponent } from './pull-to-refresh/pull-to-refresh.component';
import { ListItemComponent } from './list/list-item.component';
import { ListComponent } from './list/list.component';
import { SliderComponent } from './slider/slider.component';
import { ListKeydownDirective } from './list/list-keydown.directive';
import { SortableTableDirective } from './sortable-table/sortable-table.directive';
import { SortableColumnComponent } from './sortable-table/sortable-column.component';
//import { DatepickerComponent } from './datepicker/datepicker.component';
import { UndoComponent } from './undo-component/undo.component';
import { UndoElementsDirective } from './undo-component/undo-elements.directive';
import { StepperComponent } from './stepper/stepper.component';
import { StepComponent } from './stepper/step/step.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepHeaderComponent } from './stepper/step-header/step-header';
import { RouterModule } from '@angular/router';
import { ConnectionCheckerComponent } from './connection-checker/connection-checker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MobileNotificationBarComponent } from './mobile-notification-bar/mobile-notification-bar.component';
import { NgxSharedModule } from './ngx-shared.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { HoursDirective } from './timepicker/nextHour.directive';
import { NgxNeoDirectivesModule } from '@neocomplexx/ngx-neo-directives-mat';
import { DateSelectorComponent } from './date-selector/date-selector.component';
import { NgxMaskModule } from 'ngx-mask';

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
    //  DatepickerComponent,
    UndoComponent,
    UndoElementsDirective,
    StepperComponent,
    StepComponent,
    StepHeaderComponent,
    ConnectionCheckerComponent,
    MobileNotificationBarComponent,
    TimepickerComponent,
    HoursDirective,
    DateSelectorComponent
  ],
  imports: [
    CommonModule,
    CdkStepperModule,
    ScrollingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSharedModule,
    NgxNeoDirectivesModule,
    NgxMaskModule
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
    // DatepickerComponent,
    UndoComponent,
    UndoElementsDirective,
    StepperComponent,
    StepComponent,
    ConnectionCheckerComponent,
    MobileNotificationBarComponent,
    TimepickerComponent,
    HoursDirective,
    DateSelectorComponent
  ]
})
export class NgxNeoComponentsModule { }
