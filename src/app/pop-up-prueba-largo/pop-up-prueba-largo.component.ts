import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';
import { ICommand, Command } from '@neocomplexx/ngx-neo-directives';
import { BehaviorSubject } from 'rxjs';


@Component({
    selector: 'app-pop-up-prueba-largo',
    templateUrl: './pop-up-prueba-largo.component.html'
})


export class PopUpPruebaLargoComponent {


    // Commands para aceptar y cancelar en el modal
    public cerrarCmd: ICommand = new Command(() => this.cerrar(), new BehaviorSubject(true), true);

    constructor(public activeModal: NgbActiveModal) {
    }



    public async cerrar(): Promise<void> {
        this.activeModal.close('Close click');
    }

}
