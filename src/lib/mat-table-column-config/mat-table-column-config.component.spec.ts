import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { generateColumns, Test } from "../../test";
import { MatTableColumnConfigComponent } from "./mat-table-column-config.component";

describe("MatTableColumnConfigComponent", () => {
  let component: MatTableColumnConfigComponent<Test>;
  let fixture: ComponentFixture<MatTableColumnConfigComponent<Test>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTableColumnConfigComponent],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(MatTableColumnConfigComponent<Test>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  xit("should update column order on drop", () => {
    const event = {
      previousIndex: 0,
      currentIndex: 1,
    } as CdkDragDrop<Test>;

    let order = component.columns.map((e) => e.id);
    expect(order).toEqual(["id", "name", "value"]);
    component.onColumnDropped(event);
    order = component.columns.map((e) => e.id);
    expect(order).toEqual(["name", "id", "value"]);
  });

  xit("should toggle column visibility", () => {
    expect(component.columns[1].visible).toBeTrue();
    component.onColumnVisibilityChanged("name");
    expect(component.columns[1].visible).toBeFalse();
    component.onColumnVisibilityChanged("name");
    expect(component.columns[1].visible).toBeTrue();
  });

  it("should not change visibility for non-existent column", () => {
    const initialColumns = [...component.columns];
    component.onColumnVisibilityChanged("nonExistentColumn" as keyof Test);
    expect(component.columns).toEqual(initialColumns);
  });
});
