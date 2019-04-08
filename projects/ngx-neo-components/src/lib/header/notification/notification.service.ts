import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum NotificationPriority {
  Low = 2,
  High = 0,
  Medium = 1,
}

export enum NotificationState {
  NotRead = 0,
}

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    private _getAllNotificationsEvent = new Subject<void>();
    private _newNotificationEvent = new Subject<any>();

    public notifications: any[] = new Array<any>();
    public notificationsNotSeen = 0;

    public usersAdministrative: Array<any>;

    public notificationMaxPriority: any = NotificationPriority.Low;

    constructor() {
    }
    private async getAllNotification(): Promise<void> {

        this._getAllNotificationsEvent.next();
    }

    private notificationPriorityAnalyzer(): void {
        this.notificationMaxPriority = NotificationPriority.Low;
        for (const element of this.notifications) {
            // tslint:disable-next-line:triple-equals
            if (element.state != NotificationState.NotRead) continue;
            // tslint:disable-next-line:triple-equals
            if (element.priority == NotificationPriority.High) {
                this.notificationMaxPriority = NotificationPriority.High;
                break;
            // tslint:disable-next-line:triple-equals
            } else if (element.priority == NotificationPriority.Medium) {
                this.notificationMaxPriority = NotificationPriority.Medium;
            }
        }
    }

    public onGetAllNotifications(newMethod: () => void): void {
        this._getAllNotificationsEvent.asObservable().subscribe(newMethod);
    }
    public onNewNotification(newMethod: (dto: any) => void): void {
        this._newNotificationEvent.asObservable().subscribe(newMethod);
    }

    public async createNewNotification(title: string, details: string, usersName: string[]) {

    }

    public async createNewNotificationToUserTypeId(title: string, details: string, userTypeId: number) {
    }

    public async readNotification(notificationDTO: any): Promise<void> {

        this.notificationPriorityAnalyzer();
    }

    public async archivedNotification(notificationDTO: any): Promise<void> {

        this.notificationPriorityAnalyzer();
    }

    public async unArchivedNotification(notificationDTO: any): Promise<void> {
        this.notificationPriorityAnalyzer();
    }

    public async ClearBell(): Promise<void> {
        this.notificationsNotSeen = 0;
    }
}
