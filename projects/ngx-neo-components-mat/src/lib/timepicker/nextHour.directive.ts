
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[nextHour]'
})
export class HoursDirective {
    private el: ElementRef;
    @Input() nextHour: any;

    private focused: boolean;

    constructor(private _el: ElementRef) {
        this.el = this._el;
        this.focused = false;
    }

    @HostListener('focus') onFocus() {
        this.el.nativeElement.select();
        this.focused = true;
    }

    @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent) {

        if (e.key === 'Delete' || e.key === 'Backspace' || e.key === 'ArrowLeft' ||
            e.altKey || e.ctrlKey || e.key === 'Home' || e.key === 'End' || e.key === 'PageDown' || e.key === 'PageUp' ||
            e.key === 'ArrowRight' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Shift') {
            this.el.nativeElement.value = '';
            return;
        }
        if (e.key === 'Tab' || e.key === 'Enter') {
            return;
        }

        if ((e.key >= '0' && e.key <= '9') && this.el.nativeElement.value.length === 2 && this.focused) {
            this.el.nativeElement.value = '';
            return;
        }

        if ((!(e.key >= '0' && e.key <= '9'))) {
            e.preventDefault();
        }

        this.focused = false;
    }
}