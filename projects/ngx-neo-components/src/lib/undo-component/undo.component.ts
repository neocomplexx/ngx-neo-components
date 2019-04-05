import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { UndoService } from './undo.service';

@Component({
    selector: 'neo-undo',
    templateUrl: './undo.component.html',
    styleUrls: ['./undo.component.scss'],
  })
  export class UndoComponent {

    // @Input('undoMessage') message: string;
    // @Input('undoActionText') actionText: string;
   // @Input('showUndo') showUndo: boolean;
  //  @Input() undoTimeOutLapse: number;

    // @Output() undo: EventEmitter<string> = new EventEmitter<string>();
    // @Output() undoTimeOut: EventEmitter<void> = new EventEmitter<void>();
    
    private undoTimeOutSubscription: Subscription;

    public showUndo: boolean;
    public _subscription: Subscription;

    public message: string;
    public actionText: string;
    public undoTimeOutLapse: number;

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
       // this.undo.emit('Undo'); // 
      if ( this.undoService.functionUndo) {
        this.undoService.functionUndo();
        if (this.undoTimeOutSubscription) {
            this.undoTimeOutSubscription.unsubscribe();
            this.undoTimeOutSubscription = undefined;
        }
      //  this.showUndo = false;
      this.undoService.showUndo.next(false);
      } else {
          console.warn('Function undoAction is not defined');
      }
        
    }

    public showUndoComponent(): void
    {   this.message = this.undoService.undoMessaje;
        this.actionText = this.undoService.undoActionText;
        this.undoTimeOutLapse = this.undoService.undoTimeOutLapse;
        if (this.undoTimeOutSubscription) {
           // this.undoTimeOut.emit(); // 
           if (this.undoService.functionUndoTimeOut) {
            this.undoService.functionUndoTimeOut();
            this.undoTimeOutSubscription.unsubscribe();
            this.undoTimeOutSubscription = undefined;
           } else {
            console.warn('Function undoTimeOut is not defined');
           }
        } 

        this.undoTimeOutSubscription = timer(this.undoTimeOutLapse).subscribe((e) => {
           // this.showUndo = false;
           if ( this.undoService.functionUndoTimeOut) {
            this.undoService.showUndo.next(false);
            // this.undoTimeOut.emit(); // 
             this.undoService.functionUndoTimeOut();
           } else {
               console.warn('Function undoTimeOut is not defined');
           }
        });
       // this.showUndo = true;
    }
  }
