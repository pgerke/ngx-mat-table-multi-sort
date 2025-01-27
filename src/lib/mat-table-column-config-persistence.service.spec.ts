import { TestBed } from "@angular/core/testing";

import { MatTableColumnConfigPersistenceService } from "./mat-table-column-config-persistence.service";

describe("MatTableColumnConfigPersistenceService", () => {
  let service: MatTableColumnConfigPersistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatTableColumnConfigPersistenceService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
