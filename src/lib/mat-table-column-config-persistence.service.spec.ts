import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { Test } from "../test";
import {
  COLUMN_CONFIG_PERSISTENCE_STORAGE,
  TableColumn,
} from "./mat-table-column-config";
import { MatTableColumnConfigPersistenceService } from "./mat-table-column-config-persistence.service";

describe("MatTableColumnConfigPersistenceService", () => {
  let getItemSpy: jasmine.Spy;
  let setItemSpy: jasmine.Spy;
  let service: MatTableColumnConfigPersistenceService<Test>;

  beforeEach(() => {
    getItemSpy = spyOn(globalThis.sessionStorage, "getItem");
    setItemSpy = spyOn(globalThis.sessionStorage, "setItem");
    TestBed.configureTestingModule({
      providers: [
        {
          provide: COLUMN_CONFIG_PERSISTENCE_STORAGE,
          useValue: sessionStorage,
        },
      ],
    });
    service = TestBed.inject(MatTableColumnConfigPersistenceService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
    expect(getItemSpy).toHaveBeenCalled();
  });

  it("should have an empty columns array initially", () => {
    expect(service.columns).toEqual([]);
  });

  it("should notify subscribers when columns change", fakeAsync(() => {
    const test: TableColumn<Test>[] = [
      { id: "id", label: "ID", visible: false },
      { id: "name", label: "Name", visible: true },
      { id: "value", label: "Value", visible: true },
    ];
    let count = 0;
    service.getColumns().subscribe((columns) => {
      switch (count++) {
        case 0:
          expect(columns).toEqual([]);
          return;
        case 1:
          expect(columns).toEqual(test);
          return;
        default:
          fail("Unexpected call");
      }
    });
    expect(service.columns).toEqual([]);
    service.columns = test;
    tick();
    expect(service.columns).toEqual(test);
    expect(setItemSpy).toHaveBeenCalledTimes(1);
  }));

  it("should not persist columns if persistence is disabled", () => {
    const test: TableColumn<Test>[] = [
      { id: "id", label: "ID", visible: false },
      { id: "name", label: "Name", visible: true },
      { id: "value", label: "Value", visible: true },
    ];
    service.isPersistenceEnabled = false;
    service.columns = test;
    expect(setItemSpy).not.toHaveBeenCalled();
    service.isPersistenceEnabled = true;
    service.columns = test;
    expect(setItemSpy).toHaveBeenCalledTimes(1);
  });

  it("should load persisted value when key changes", () => {
    expect(service.key).toBe("mat-table-persistence-column-config");
    const test: TableColumn<Test>[] = [
      { id: "id", label: "ID", visible: false },
      { id: "name", label: "Name", visible: true },
      { id: "value", label: "Value", visible: true },
    ];
    service.columns = test;
    expect(setItemSpy).toHaveBeenCalledTimes(1);
    service.setPersistenceKey("test-key");
    expect(service.key).toBe("test-key");
    expect(getItemSpy).toHaveBeenCalledWith("test-key");
    expect(service.columns).toEqual([]);
    getItemSpy.and.returnValue(JSON.stringify(test));
    service.setPersistenceKey("test-key1");
    expect(service.key).toBe("test-key1");
    expect(service.columns).toEqual(test);
    expect(setItemSpy).toHaveBeenCalledTimes(1);
  });

  it("should overwrite persisted columns when key changes", () => {
    const test: TableColumn<Test>[] = [
      { id: "id", label: "ID", visible: false },
      { id: "name", label: "Name", visible: true },
      { id: "value", label: "Value", visible: true },
    ];
    service.columns = test;
    expect(getItemSpy).toHaveBeenCalledTimes(1);
    service.setPersistenceKey("test-key", true);
    expect(setItemSpy).toHaveBeenCalledWith("test-key", JSON.stringify(test));
    expect(getItemSpy).toHaveBeenCalledTimes(1);
  });
});

describe("MatTableColumnConfigPersistenceService", () => {
  it("should restore persisted settings", () => {
    const test: TableColumn<Test>[] = [
      { id: "id", label: "ID", visible: false },
      { id: "name", label: "Name", visible: true },
      { id: "value", label: "Value", visible: true },
    ];
    spyOn(globalThis.sessionStorage, "getItem").and.returnValue(
      JSON.stringify(test)
    );
    TestBed.configureTestingModule({
      providers: [
        {
          provide: COLUMN_CONFIG_PERSISTENCE_STORAGE,
          useValue: sessionStorage,
        },
      ],
    });
    const service = TestBed.inject(MatTableColumnConfigPersistenceService);
    expect(service.columns).toEqual(test);
  });
});
