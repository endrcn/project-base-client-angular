import { TestBed } from '@angular/core/testing';

import { AuditlogsService } from './auditlogs.service';

describe('AuditlogsService', () => {
  let service: AuditlogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditlogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
