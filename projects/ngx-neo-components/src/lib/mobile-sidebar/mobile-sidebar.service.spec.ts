import { TestBed } from '@angular/core/testing';

import { MobileSidebarService } from './mobile-sidebar.service';

describe('MobileSidebarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MobileSidebarService = TestBed.get(MobileSidebarService);
    expect(service).toBeTruthy();
  });
});
