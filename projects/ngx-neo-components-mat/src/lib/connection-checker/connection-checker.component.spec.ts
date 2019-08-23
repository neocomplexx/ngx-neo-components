import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionCheckerComponent } from './connection-checker.component';

describe('ConnectionCheckerComponent', () => {
  let component: ConnectionCheckerComponent;
  let fixture: ComponentFixture<ConnectionCheckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionCheckerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
