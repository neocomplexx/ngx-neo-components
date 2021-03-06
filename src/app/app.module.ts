import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgxNeoComponentsModule } from 'ngx-neo-components-mat';
import { NgxNeoComponentsModule } from 'ngx-neo-components';
import { FilterPipe } from './filter.pipe';
// import { CustomHammerConfig } from 'projects/ngx-neo-components/src/lib/shared/services/hammer/custom-hammer-config';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CustomHammerConfig } from 'projects/ngx-neo-components-mat/src/lib/shared/services/hammer/custom-hammer-config';
import { NgxNeoDirectivesModule } from '@neocomplexx/ngx-neo-directives-mat';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    CdkStepperModule,
    RouterModule.forRoot([]),
    BrowserAnimationsModule,
    NgxNeoComponentsModule,
    NgxNeoDirectivesModule,
    MatCardModule,
    MatListModule,
    NgxMaskModule.forRoot(),
    FormsModule,
    ScrollingModule
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: CustomHammerConfig
    },
  ],
  entryComponents: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
