import { TestBed } from '@angular/core/testing';

import { MatTableConfigPersistenceService } from './mat-table-config-persistence.service';

describe('MatTableConfigPersistenceService', () => {
  let service: MatTableConfigPersistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatTableConfigPersistenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
