import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNotificationBarComponent } from './mobile-notification-bar.component';

describe('MobileNotificationBarComponent', () => {
  let component: MobileNotificationBarComponent;
  let fixture: ComponentFixture<MobileNotificationBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileNotificationBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileNotificationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
