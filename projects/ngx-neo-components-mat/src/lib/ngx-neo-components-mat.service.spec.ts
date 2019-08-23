import { TestBed } from '@angular/core/testing';

import { NgxNeoComponentsMatService } from './ngx-neo-components-mat.service';

describe('NgxNeoComponentsMatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxNeoComponentsMatService = TestBed.get(NgxNeoComponentsMatService);
    expect(service).toBeTruthy();
  });
});
