import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatListModule, MatMenuModule, MatIconModule],
    exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatListModule, MatMenuModule, MatIconModule],
})
export class NgxSharedModule { }
