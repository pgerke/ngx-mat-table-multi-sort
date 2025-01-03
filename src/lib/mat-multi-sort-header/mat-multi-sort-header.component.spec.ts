import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSort, SortDirection } from "@angular/material/sort";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatMultiSortDirective } from "../mat-multi-sort.directive";
import { MatMultiSortHeaderComponent } from "./mat-multi-sort-header.component";

describe("MatMultiSortHeaderComponent", () => {
  let component: MatMultiSortHeaderComponent;
  let fixture: ComponentFixture<MatMultiSortHeaderComponent>;
  let sort: MatMultiSortDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MatMultiSortHeaderComponent],
      providers: [
        MatMultiSortDirective,
        { provide: MatSort, useExisting: MatMultiSortDirective },
      ],
    }).compileComponents();

    sort = TestBed.inject(MatMultiSortDirective);
    fixture = TestBed.createComponent(MatMultiSortHeaderComponent);
    component = fixture.componentInstance;
    component.id = "test";
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should not trigger sort when the header is disabled", () => {
    sort.disabled = false;
    component.disabled = true;
    const spy = spyOn(sort, "sort");
    component._toggleOnInteraction();
    expect(spy).not.toHaveBeenCalled();
  });

  it("should not trigger sort when sorting is disabled on the directive", () => {
    sort.disabled = true;
    component.disabled = false;
    const spy = spyOn(sort, "sort");
    component._toggleOnInteraction();
    expect(spy).not.toHaveBeenCalled();
  });

  it("should trigger sort when the header is enabled", () => {
    sort.disabled = false;
    component.disabled = false;
    const spy = spyOn(sort, "sort");
    component._toggleOnInteraction();
    expect(spy).toHaveBeenCalled();
  });

  [
    { direction: "asc", aria: "ascending" },
    { direction: "desc", aria: "descending" },
  ].forEach((test) => {
    it(`should behave correctly when sorted ${test.aria}ly`, () => {
      component.id = "test";
      sort._sorts.push({
        active: "test",
        direction: test.direction as SortDirection,
      });
      component._updateArrowDirection();
      expect(component._arrowDirection).toBe(test.direction);
      expect(component.sortDirection).toBe(test.direction);
      expect(component.sortIndex).toBe(0);
      expect(component._isSorted()).toBe(true);
      expect(component._getAriaSortAttribute()).toBe(test.aria);
    });
  });
});
