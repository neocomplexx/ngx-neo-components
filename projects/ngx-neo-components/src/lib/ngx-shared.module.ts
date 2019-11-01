import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    // tslint:disable-next-line:max-line-length
    imports: [MatFormFieldModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatListModule, MatMenuModule, MatIconModule, MatDatepickerModule, MatNativeDateModule],
    // tslint:disable-next-line:max-line-length
    exports: [MatFormFieldModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatListModule, MatMenuModule, MatIconModule, MatDatepickerModule, MatNativeDateModule],
})
export class NgxSharedModule { }
