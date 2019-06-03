import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

/**
 * This component uses the native datepicker in mobile devices and the ngbootstrap
 * datepicker in desktop.
 * The component can receive either a javascript date or a NgbDate.
 */
@Component({
    selector: 'neo-datepicker',
    templateUrl: './datepicker.component.html'
})
export class DatepickerComponent {

    // we use a private property so when the other has to modify it it wont cause an 
    // infinite loop
    private _date: Date;
    @Input() set date(value: Date) {
        this._date = value;
        this._ngbdate = new NgbDate(value.getFullYear(), value.getMonth() + 1, value.getDate());
    };
    get date() {
        return this._date;
    }
    @Output() dateChange: EventEmitter<Date> = new EventEmitter<Date>();

    // we use a private property so when the other has to modify it it wont cause an 
    // infinite loop
    private _ngbdate: NgbDate;
    @Input() set ngbdate(value: NgbDate) {
        this._ngbdate = value;
        this._date = new Date(value.year, value.month - 1, value.day);
    };
    get ngbdate(): NgbDate {
        return this._ngbdate;
    }
    @Output() ngbdateChange: EventEmitter<NgbDate> = new EventEmitter<NgbDate>();

    @Input() minDateNgb: NgbDate;
    @Input() maxDateNgb: NgbDate;
    @Input() minDateString: string;
    @Input() maxDateString: string;

    public isMobile = false;

    // Get and set used by the NgBootstrap datepicker
    public get ngbModel(): NgbDate {
        return this.ngbdate;
    }
    public set ngbModel(value: NgbDate) {
        const dateModel = new Date(value.year, value.month - 1, value.day);
        this.ngbdateChange.emit(value);
        this.dateChange.emit(dateModel);
    }

     // Get and set used by the native datepicker
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

    public getMinDateString(): string {
        if (this.minDateString) {
            return this.minDateString;
        }
        if (this.minDateNgb) {
            return this.minDateNgb.year + '-' + this.minDateNgb.month + '-' + this.minDateNgb.day;
        }
        return null;
    }

    public getMaxDateString(): string {
        if (this.maxDateString) {
            return this.maxDateString;
        }
        if (this.maxDateNgb) {
            return this.maxDateNgb.year + '-' + this.maxDateNgb.month + '-' + this.maxDateNgb.day;
        }
        return null;
    }

    public getMinDateNgb() {
        if (this.minDateNgb) {
            return this.minDateNgb;
        }
        if (this.minDateString) {
            const dateParts = this.minDateString.split('-');
            return new NgbDate(+dateParts[0], +dateParts[1], +dateParts[2]);
        }
        return null;
    }

    public getMaxDateNgb() {
        if (this.maxDateNgb) {
            return this.maxDateNgb;
        }
        if (this.maxDateString) {
            const dateParts = this.maxDateString.split('-');
            return new NgbDate(+dateParts[0], +dateParts[1], +dateParts[2]);
        }
        return null;
    }



}
