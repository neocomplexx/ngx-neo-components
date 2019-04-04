import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxNeoComponentsModule } from 'ngx-neo-components';
import { FilterPipe } from './filter.pipe';
import { CustomHammerConfig } from 'projects/ngx-neo-components/src/lib/shared/services/hammer/custom-hammer-config';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PopUpPruebaComponent } from './pop-up-prueba/pop-up-prueba.component';
import { PopUpPruebaLargoComponent } from './pop-up-prueba-largo/pop-up-prueba-largo.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    PopUpPruebaComponent,
    PopUpPruebaLargoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxNeoComponentsModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: CustomHammerConfig
    },
  ],
  entryComponents: [
    PopUpPruebaComponent,
    PopUpPruebaLargoComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
