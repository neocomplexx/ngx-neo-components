import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatFormField } from '@angular/material/form-field';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { FormControl, NgForm, Validators } from '@angular/forms';

import * as moment_ from 'moment';

const moment = moment_;

import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Platform } from '@angular/cdk/platform';


export const MY_FORMATS = {
  parse: {
    dateInput: ['DD/MM/YYYY', 'DD-MM-YYYY']
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD MM YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'neo-date-selector',
  templateUrl: './date-selector.component.html',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-Ar' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class DateSelectorComponent implements OnInit, AfterViewInit {

  public _date: FormControl;
  public dateFormControl: FormControl;

  @Input() set date(date: Date) {
    if (date) {
      this._date.setValue(moment(date));
      const _dateCustom = moment(date).format('DDMMYYYY');
      if (_dateCustom) {
        this.dateFormControl.setValue(_dateCustom);
      }
    }
  }
  @Output() dateChange = new EventEmitter<Date>();

  @Input() min: Date;
  @Input() max: Date;
  @Input() id: string;
  @Input() name: string;
  @Input() formClass: string;
  @Input() inpClass: string;
  @Input() appearance: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() neoAutoFocus: boolean = false;
  @Input() required: boolean = false;
  @Input() form: NgForm;
  @Input() set disabled(value: boolean) {
    if (value) {
      this.dateFormControl.disable();
      this._date.disable();
    } else {
      this._date.enable();
      this.dateFormControl.enable();

    }

  }
  @Input() onlyValidDate: boolean = false;


  @ViewChild('formField', { static: false }) formField: MatFormField;
  @ViewChild('formInp', { static: false }) formInp: ElementRef;
  @ViewChild('picker', { static: false }) picker: MatDatepicker<any>;

  public small: boolean;

  constructor(private el: ElementRef, private renderer: Renderer2, private platform: Platform, private breakpointObserver: BreakpointObserver) {
    this.small = this.breakpointObserver.isMatched('(max-width: 599px)');
    this.breakpointObserver.observe([
      Breakpoints.Small,
      Breakpoints.XSmall
    ]).subscribe(result => {
      this.small = result.matches;
    });

    this.dateFormControl = new FormControl();
    this._date = new FormControl();
  }

  ngOnInit() {
    if (<any>this.required === '') this.required = true;
    if (this.name == undefined && this.id && this.id.length > 0) this.name = this.id;
    this.el.nativeElement.id = undefined;


  }

  ngAfterViewInit() {
    if (this.formClass) {
      const classes = this.formClass.split(' ');
      classes.forEach(htmlClass => this.renderer.addClass(this.formField._elementRef.nativeElement, htmlClass));
    }
    if (this.inpClass) {
      const classes = this.inpClass.split(' ');
      classes.forEach(htmlClass => this.renderer.addClass(this.formInp.nativeElement, htmlClass));

    }
    if (this.required) {
      this.dateFormControl.setValidators(Validators.required);
    }
    if (this.form) {
      this.form.control.addControl('dateFormControl', this.dateFormControl);
      this.form.control.get('dateFormControl').updateValueAndValidity();
    }

    fromEvent(this.formInp.nativeElement, 'keyup').pipe(
      filter((event: any) => { return event.keyCode < 37 || event.keyCode > 40 }),
      map((event: any) => {
        return event.target.value;
      }),
      debounceTime(100),
      distinctUntilChanged()
    ).subscribe((text: string) => {
      this.customChange(text);
    });
  }

  public newDate($event: MatDatepickerInputEvent<any>) {
    const date = $event.value.toDate();
    const _dateCustom = $event.value.format('DDMMYYYY');
    this.dateFormControl.setValue(_dateCustom);
    this.emit(date);
  }


  private customChange($event: string) {
    const _dateCustom = this.dateFormControl.value;
    if (_dateCustom && _dateCustom.length === 8) {
      const date = moment(_dateCustom, 'DDMMYYYY', true);
      const nativeDate = date.toDate();

      if (date.isValid()) {

        let valid = true;

        if (this.min && this.min > nativeDate) {
          this.dateFormControl.setErrors({ 'min': true });
          valid = false;
        }

        if (this.max && this.max < nativeDate) {
          this.dateFormControl.setErrors({ 'max': true });
          valid = false;
        }

        if (valid) {
          this._date.setValue(moment(date));
          this.emit(nativeDate);
        } else {
          this.emit(null);
        }

      } else {
        this.dateFormControl.setErrors({ 'incorrect': true });
        this.emit(null);
      }
    } else {
      this.dateFormControl.setErrors({ 'incorrect': true });
      this.emit(null);
    }
  }

  private emit(date: Date | null | undefined): void {
    if (date || !this.onlyValidDate) {
      this.dateChange.emit(date);
    }

  }

  public clickInput() {
    if ((this.platform.ANDROID || this.platform.IOS) || this.small) {
      this.openPicker();
    }
  }

  private openPicker() {
    this.picker.open();
  }


}
