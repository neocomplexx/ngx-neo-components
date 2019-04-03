import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { UndoService } from './undo.service';

@Component({
    selector: 'neo-undo',
    templateUrl: './undo.component.html',
    styleUrls: ['./undo.component.scss'],
  })
  export class UndoComponent {

    @Input('message') message: string;
    @Input('actionText') actionText: string;
   // @Input('showUndo') showUndo: boolean;
    @Input() undoTimeOutLapse: number;

    @Output() undo: EventEmitter<string> = new EventEmitter<string>();
    @Output() undoTimeOut: EventEmitter<void> = new EventEmitter<void>();
    
    private undoTimeOutSubscription: Subscription;

    public showUndo: boolean;
    public _subscription: Subscription;

    constructor(private undoService: UndoService) {
        this.showUndo = false;

        this._subscription = this.undoService.showingUndo.subscribe ((res) => 
        {   this.showUndo = res;
            if (res) {
                this.showUndoComponent();
            }
        });
    }

    public undoAction(): void {
        this.undo.emit('Undo');
        if (this.undoTimeOutSubscription) {
            this.undoTimeOutSubscription.unsubscribe();
            this.undoTimeOutSubscription = undefined;
        }
      //  this.showUndo = false;
      this.undoService.showUndo.next(false);
    }

    public showUndoComponent(): void
    {
        if (this.undoTimeOutSubscription) {
            this.undoTimeOut.emit();
            this.undoTimeOutSubscription.unsubscribe();
            this.undoTimeOutSubscription = undefined;
        }

        this.undoTimeOutSubscription = timer(this.undoTimeOutLapse).subscribe((e) => {
           // this.showUndo = false;
            this.undoService.showUndo.next(false);
            this.undoTimeOut.emit();
        });
       // this.showUndo = true;

        console.log('MUESTRO EL UNDO', this.showUndo);
    }
  }
