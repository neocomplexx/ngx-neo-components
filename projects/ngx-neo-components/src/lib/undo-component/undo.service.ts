import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UndoService {
    constructor() {}

    public showUndo = new BehaviorSubject<boolean>(false);
    public showingUndo = this.showUndo.asObservable();

    public functionUndo: () => void;
    public functionUndoTimeOut: () => void;
    public undoMessaje: string;
    public undoActionText: string;
    public undoTimeOutLapse: number;

}