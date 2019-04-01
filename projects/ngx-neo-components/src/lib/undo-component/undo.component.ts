import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'neo-undo',
    templateUrl: './undo.component.html',
    styleUrls: ['./undo.component.scss'],
  })
  export class UndoComponent {

    @Input('message') message: string;
    @Input('actionText') actionText: string;
    @Input('showUndo') showUndo: boolean;

    @Output() undo: EventEmitter<string> = new EventEmitter<string>();

    component() {}

    public undoAction(): void {
        this.undo.emit('Undo');
    }
  }
