import { ComponentFixture, TestBed } from "@angular/core/testing";
import { generateColumns, Test } from "../../test";
import { TABLE_COLUMNS } from "../mat-table-column-config";
import { MatTableColumnConfigComponent } from "./mat-table-column-config.component";

describe("MatTableColumnConfigComponent", () => {
  let component: MatTableColumnConfigComponent<Test>;
  let fixture: ComponentFixture<MatTableColumnConfigComponent<Test>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTableColumnConfigComponent],
      providers: [{ provide: TABLE_COLUMNS, useValue: generateColumns() }],
    }).compileComponents();

    fixture = TestBed.createComponent(MatTableColumnConfigComponent<Test>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
