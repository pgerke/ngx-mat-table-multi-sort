import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSortable } from "@angular/material/sort";
import {
  MatMultiSortDirective,
  SORT_PERSISTENCE_ENABLED,
} from "./mat-multi-sort.directive";

@Component({
  selector: "mat-multi-sort-test",
  standalone: true,
})
class TestComponent extends MatMultiSortDirective {}

describe("MatMultiSortDirective", () => {
  let fixture: ComponentFixture<TestComponent>;
  let directive: MatMultiSortDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, MatMultiSortDirective],
      providers: [{ provide: SORT_PERSISTENCE_ENABLED, useValue: false }],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    directive = fixture.componentInstance;
    directive._sorts.set([
      { active: "col1", direction: "asc" },
      { active: "col2", direction: "desc" },
      { active: "col3", direction: "asc" },
    ]);
  });

  it("should create an instance", () => {
    expect(directive).toBeTruthy();
  });

  it("should return the sort direction for a given column ID", () => {
    expect(directive.getSortDirection("col1")).toBe("asc");
  });

  it("should return an empty sort direction for a column that is not sorted", () => {
    expect(directive.getSortDirection("unknown")).toBe("");
  });

  it("should return the sort index of the given column ID", () => {
    expect(directive.getSortIndex("col2")).toBe(1);
  });

  it("should return -1 for a column that is not sorted", () => {
    expect(directive.getSortIndex("unknown")).toBe(-1);
  });

  it("should append a new column to the list of sort columns with the specified direction", () => {
    const spy = spyOn(directive.sortChange, "emit");
    directive.sort({ id: "test", start: "desc" } as MatSortable);
    expect(directive._sorts()).toEqual([
      { active: "col1", direction: "asc" },
      { active: "col2", direction: "desc" },
      { active: "col3", direction: "asc" },
      { active: "test", direction: "desc" },
    ]);
    expect(directive.active).toBe("test");
    expect(directive.direction).toBe("desc");
    expect(spy).toHaveBeenCalledWith({ active: "test", direction: "desc" });
  });

  it("should append a new column to the list of sort columns with the default sort direction unless otherwise specified", () => {
    const spy = spyOn(directive.sortChange, "emit");
    directive.sort({ id: "test" } as MatSortable);
    expect(directive._sorts()).toEqual([
      { active: "col1", direction: "asc" },
      { active: "col2", direction: "desc" },
      { active: "col3", direction: "asc" },
      { active: "test", direction: directive.start },
    ]);
    expect(directive.active).toBe("test");
    expect(directive.direction).toBe("asc");
    expect(spy).toHaveBeenCalledWith({ active: "test", direction: "asc" });
  });

  it("should update the direction of an existing column", () => {
    const spy = spyOn(directive.sortChange, "emit");
    directive.sort({ id: "col1" } as MatSortable);
    expect(directive._sorts()).toEqual([
      { active: "col1", direction: "desc" },
      { active: "col2", direction: "desc" },
      { active: "col3", direction: "asc" },
    ]);
    expect(directive.active).toBe("col1");
    expect(directive.direction).toBe("desc");
    expect(spy).toHaveBeenCalledWith({ active: "col1", direction: "desc" });
  });

  it("should remove the direction of an existing column if the direction is empty", () => {
    directive.disableClear = false;
    const spy = spyOn(directive.sortChange, "emit");
    directive.sort({ id: "col2" } as MatSortable);
    expect(directive._sorts()).toEqual([
      { active: "col1", direction: "asc" },
      { active: "col3", direction: "asc" },
    ]);
    expect(directive.active).toBe("col2");
    expect(directive.direction).toBe("");
    expect(spy).toHaveBeenCalledWith({ active: "col2", direction: "" });
  });

  it("should remove a sort level by its identifier", () => {
    const spy = spyOn(directive.sortChange, "emit");
    directive.removeSortLevel("col2");
    expect(directive._sorts()).toEqual([
      { active: "col1", direction: "asc" },
      { active: "col3", direction: "asc" },
    ]);
    expect(spy).toHaveBeenCalledWith();
  });

  it("should not change the sort levels if the identifier is not found", () => {
    const spy = spyOn(directive.sortChange, "emit");
    directive.removeSortLevel("unknown");
    expect(directive._sorts()).toEqual([
      { active: "col1", direction: "asc" },
      { active: "col2", direction: "desc" },
      { active: "col3", direction: "asc" },
    ]);
    expect(spy).not.toHaveBeenCalled();
  });

  it("should reorder the sort levels when previousIndex and currentIndex are different", () => {
    const spy = spyOn(directive.sortChange, "emit");
    directive.reorderSortLevel(0, 2);
    expect(directive._sorts()).toEqual([
      { active: "col2", direction: "desc" },
      { active: "col3", direction: "asc" },
      { active: "col1", direction: "asc" },
    ]);
    expect(spy).toHaveBeenCalledWith({ active: "col1", direction: "asc" });
  });

  it("should not reorder the sort levels when previousIndex and currentIndex are the same", () => {
    const spy = spyOn(directive.sortChange, "emit");
    directive.reorderSortLevel(1, 1);
    expect(directive._sorts()).toEqual([
      { active: "col1", direction: "asc" },
      { active: "col2", direction: "desc" },
      { active: "col3", direction: "asc" },
    ]);
    expect(spy).not.toHaveBeenCalled();
  });

  it("should toggle the sort direction for an existing column", () => {
    const spy = spyOn(directive.sortChange, "emit");
    directive.toggleSortDirection("col1");
    expect(directive._sorts()).toEqual([
      { active: "col1", direction: "desc" },
      { active: "col2", direction: "desc" },
      { active: "col3", direction: "asc" },
    ]);
    expect(directive.active).toBe("col1");
    expect(directive.direction).toBe("desc");
    expect(spy).toHaveBeenCalledWith({ active: "col1", direction: "desc" });
  });

  it("should not change the sort direction for a column that is not sorted", () => {
    const spy = spyOn(directive.sortChange, "emit");
    directive.toggleSortDirection("unknown");
    expect(directive._sorts()).toEqual([
      { active: "col1", direction: "asc" },
      { active: "col2", direction: "desc" },
      { active: "col3", direction: "asc" },
    ]);
    expect(spy).not.toHaveBeenCalled();
  });

  it("should cycle through sort directions for an existing column", () => {
    directive.disableClear = false;
    const spy = spyOn(directive.sortChange, "emit");

    directive.toggleSortDirection("col1");
    expect(directive._sorts()).toEqual([
      { active: "col1", direction: "desc" },
      { active: "col2", direction: "desc" },
      { active: "col3", direction: "asc" },
    ]);
    expect(directive.active).toBe("col1");
    expect(directive.direction).toBe("desc");
    expect(spy).toHaveBeenCalledWith({ active: "col1", direction: "desc" });

    directive.toggleSortDirection("col1");
    expect(directive._sorts()).toEqual([
      { active: "col1", direction: "asc" },
      { active: "col2", direction: "desc" },
      { active: "col3", direction: "asc" },
    ]);
    expect(directive.active).toBe("col1");
    expect(directive.direction).toBe("asc");
    expect(spy).toHaveBeenCalledWith({ active: "col1", direction: "asc" });
  });

  it("should clear the current sorting state", () => {
    const spy = spyOn(directive.sortChange, "emit");
    directive.clearSorting();
    expect(directive.active).toBe("");
    expect(directive.direction).toBe("");
    expect(directive._sorts()).toEqual([]);
    expect(spy).toHaveBeenCalled();
  });
});
