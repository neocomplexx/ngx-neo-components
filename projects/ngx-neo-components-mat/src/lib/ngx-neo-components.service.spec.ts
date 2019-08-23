import { TestBed } from '@angular/core/testing';

import { NgxNeoComponentsService } from './ngx-neo-components.service';

describe('NgxNeoComponentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxNeoComponentsService = TestBed.get(NgxNeoComponentsService);
    expect(service).toBeTruthy();
  });
});
