import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxNeoComponentsModule } from 'ngx-neo-components';
import { CustomHammerConfig } from 'projects/ngx-neo-components/src/lib/shared/services/hammer/custom-hammer-config';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxNeoComponentsModule
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: CustomHammerConfig
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
