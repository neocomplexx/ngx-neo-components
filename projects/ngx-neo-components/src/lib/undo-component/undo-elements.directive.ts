import { Directive, Input, AfterContentInit } from '@angular/core';
import { UndoService } from './undo.service';

@Directive({
  selector: '[neoUndoElements]'
})
export class UndoElementsDirective  implements AfterContentInit {

  @Input('neoUndoElements') undoMessage: string;
  @Input() undoActionText: string;
  @Input() undoTimeOutLapse: number;
  @Input() undo: () => void;
  @Input() undoTimeOut: () => void;

  constructor(private undoService: UndoService) { }

  ngAfterContentInit() {
    this.undoService.functionUndo = this.undo;
    this.undoService.functionUndoTimeOut = this.undoTimeOut;
    this.undoService.undoMessaje = this.undoMessage;
    this.undoService.undoActionText = this.undoActionText;
    this.undoService.undoTimeOutLapse = this.undoTimeOutLapse;

  }

}
