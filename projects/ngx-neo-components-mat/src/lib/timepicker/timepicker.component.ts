import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'neo-timepicker',
  templateUrl: './timepicker.component.html'
})
export class TimepickerComponent implements OnInit {

  @Input() time: Date;
  @Input() isRequired: boolean;
  @Input() disabled: boolean;
  @Output() timeChange = new EventEmitter();

  public hours: string;
  public minutes: string;

  constructor() {
  }

  ngOnInit() {
    // Inicialización de hora
    if (this.time) {
      this.hours = ('00' + this.time.getHours()).slice(-2);
      this.minutes = ('00' + this.time.getMinutes()).slice(-2);
    }
  }

  hourChange(event) { console.log(event);
    let hora: number = Number(event);
    if (hora !== null && hora !== undefined) {
      if (hora < 0) { hora = 0; this.hours = '00'; } else if (hora > 23) { hora = 23; this.hours = '23'; } else { this.hours = '' + hora; }
      if (!this.time) {
        this.time = new Date();
        this.time.setMinutes(0);
        this.time.setSeconds(0);
        this.time.setMilliseconds(0);
      }
      this.time.setHours(hora);
    }

    this.timeChange.emit(this.time);
  }

  minutesChange(event) { console.log(event);

    let minutos: number = Number(event);
    if (minutos !== null && minutos !== undefined) {
      if (minutos < 0) { minutos = 0; this.minutes = '00'; } else if (minutos > 59) { minutos = 59; this.minutes = '59'; } else { this.minutes = '' + minutos; }
      if (!this.time) {
        this.time = new Date();
        this.time.setMinutes(0);
        this.time.setSeconds(0);
        this.time.setMilliseconds(0);
      }
      this.time.setMinutes(minutos);
      this.time.setSeconds(0);
    }

    this.timeChange.emit(this.time);

  }

}
