import { TestBed } from '@angular/core/testing';

import { ERPService } from './erp.service';

describe('ERPService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ERPService = TestBed.get(ERPService);
    expect(service).toBeTruthy();
  });
});
