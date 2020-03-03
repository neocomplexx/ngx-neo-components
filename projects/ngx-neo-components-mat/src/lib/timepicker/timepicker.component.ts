import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'neo-timepicker',
  templateUrl: './timepicker.component.html'
})
export class TimepickerComponent implements OnInit {
  // https://stackoverflow.com/questions/38571812/how-to-detect-when-an-input-value-changes-in-angular
  
  private _time: Date;
  @Input() set time(value: Date) {
    this._time = value;
    this.ngOnInit();
  };
  get time(): Date {
    return this._time;
  }

  @Input() isRequired: boolean;
  @Output() timeChange = new EventEmitter();
  @Input() disabled: boolean;

  public hours: string;
  public minutes: string;

  constructor() {
  }

  ngOnInit() {
    // Inicialización de hora
    if (this._time) {
      this.hours = ('00' + this._time.getHours()).slice(-2);
      this.minutes = ('00' + this._time.getMinutes()).slice(-2);
    }
  }

  hourChange(event) { 
    let hora: number = Number(event);
    if (hora !== null && hora !== undefined) {
      if (hora < 0) { hora = 0; this.hours = '00'; } else if (hora > 23) { hora = 23; this.hours = '23'; } else { this.hours = '' + hora; }
      if (!this._time) {
        this._time = new Date();
        this._time.setMinutes(0);
        this._time.setSeconds(0);
        this._time.setMilliseconds(0);
      }
      this._time.setHours(hora);
    }

    this.timeChange.emit(this._time);
  }

  minutesChange(event) { console.log(event);

    let minutos: number = Number(event);
    if (minutos !== null && minutos !== undefined) {
      if (minutos < 0) { minutos = 0; this.minutes = '00'; } else if (minutos > 59) { minutos = 59; this.minutes = '59'; } else { this.minutes = '' + minutos; }
      if (!this._time) {
        this._time = new Date();
        this._time.setMinutes(0);
        this._time.setSeconds(0);
        this._time.setMilliseconds(0);
      }
      this._time.setMinutes(minutos);
      this._time.setSeconds(0);
    }

    this.timeChange.emit(this._time);
  }
}
