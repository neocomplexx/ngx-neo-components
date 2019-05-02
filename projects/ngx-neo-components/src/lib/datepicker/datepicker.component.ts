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

    private _ngbModel: NgbDate;
    public get ngbModel(): NgbDate {
        return this._ngbModel;
    }
    public set ngbModel(value: NgbDate) {
        this._ngbModel = value;
        this._dateModel = new Date(value.year, value.month - 1, value.day);
        this.ngbdateChange.emit(this._ngbModel);
        this.dateChange.emit(this._dateModel);
    }
    private _dateModel: Date;
    public get dateModel(): Date {
        return this._dateModel;
    }
    public set dateModel(value: Date) {
        this._dateModel = value;
        this._ngbModel = new NgbDate(value.getFullYear(), value.getMonth() + 1, value.getDate());
        this.dateChange.emit(this._dateModel);
        this.ngbdateChange.emit(this._ngbModel);
    }

    constructor(private platform: Platform) {
        if (this.platform.ANDROID || this.platform.IOS) {
            this.isMobile = true;
        }
    }



}
