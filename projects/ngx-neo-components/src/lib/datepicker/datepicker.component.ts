import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Platform} from '@angular/cdk/platform';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'neo-datepicker',
    templateUrl: './datepicker.component.html'
})
export class DatepickerComponent {

    @Input() date: Date;
    @Output() dateChange: EventEmitter<Date> = new EventEmitter<Date>();

    @Input() ngbdate: NgbDate;
    @Output() ngbdateChange: EventEmitter<NgbDate> = new EventEmitter<NgbDate>();

    public isMobile = false;

    public get ngbModel(): NgbDate {
        return this.ngbdate;
    }
    public set ngbModel(value: NgbDate) {
        const dateModel = new Date(value.year, value.month - 1, value.day);
        this.ngbdateChange.emit(value);
        this.dateChange.emit(dateModel);
    }

    public get dateModel(): Date {
        return this.date;
    }
    public set dateModel(value: Date) {
        const ngbModel = new NgbDate(value.getFullYear(), value.getMonth() + 1, value.getDate());
        this.dateChange.emit(value);
        this.ngbdateChange.emit(ngbModel);
    }

    constructor(private platform: Platform) {
        if (this.platform.ANDROID || this.platform.IOS) {
            this.isMobile = true;
        }
    }



}
