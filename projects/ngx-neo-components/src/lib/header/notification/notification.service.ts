import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum NotificationState {
  NotRead = 0,
}

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    protected _getAllNotificationsEvent = new Subject<void>();
    protected _newNotificationEvent = new Subject<any>();

    public notifications: any[] = new Array<any>();
    public notificationsNotSeen = 0;

    public usersAdministrative: Array<any>;

    public notificationMaxPriority: number = 0;

    constructor() {
    }

    public async createNewNotification(title: string, details: string, usersName: string[]) {

    }

    public async readNotification(notificationDTO: any): Promise<void> {
    }

    public async archivedNotification(notificationDTO: any): Promise<void> {
    }

    public async unArchivedNotification(notificationDTO: any): Promise<void> {
    }

    public async ClearBell(): Promise<void> {
    }
}
