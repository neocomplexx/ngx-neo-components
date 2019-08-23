import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatListModule, MatMenuModule],
    exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatListModule, MatMenuModule],
})
export class NgxSharedModule { }
