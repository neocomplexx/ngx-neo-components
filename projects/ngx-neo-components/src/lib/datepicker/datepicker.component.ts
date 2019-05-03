import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'neo-datepicker',
    templateUrl: './datepicker.component.html'
})
export class DatepickerComponent {

    private _date: Date;
    @Input() set date(value: Date) {
        this._date = value;
        this._ngbdate = new NgbDate(value.getFullYear(), value.getMonth() + 1, value.getDate());
    };
    get date() {
        return this._date;
    }
    @Output() dateChange: EventEmitter<Date> = new EventEmitter<Date>();

    private _ngbdate: NgbDate;
    @Input() set ngbdate(value: NgbDate) {
        this._ngbdate = value;
        this._date = new Date(value.year, value.month - 1, value.day);
    };
    get ngbdate(): NgbDate {
        return this._ngbdate;
    }
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

    public get dateModel(): string {
        if (this.date) {
            return this.date.toISOString().substring(0, 10);
        } else {
            return undefined;
        }
    }
    public set dateModel(value: string) {
        if (value.length === 10) { value += 'T03:00:00Z'; }
        const valueDate = new Date(value);
        const ngbModel = new NgbDate(valueDate.getFullYear(), valueDate.getMonth() + 1, valueDate.getDate());
        this.dateChange.emit(valueDate);
        this.ngbdateChange.emit(ngbModel);
    }

    constructor(private platform: Platform) {
        if (this.platform.ANDROID || this.platform.IOS) {
            this.isMobile = true;
        }
    }



}
