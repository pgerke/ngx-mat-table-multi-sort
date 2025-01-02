import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSort } from "@angular/material/sort";
import { MatMultiSortDirective } from "../mat-multi-sort.directive";
import { MatMultiSortHeaderComponent } from "./mat-multi-sort-header.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

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
});
