import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxNeoComponentsMatComponent } from './ngx-neo-components-mat.component';

describe('NgxNeoComponentsMatComponent', () => {
  let component: NgxNeoComponentsMatComponent;
  let fixture: ComponentFixture<NgxNeoComponentsMatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxNeoComponentsMatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxNeoComponentsMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
