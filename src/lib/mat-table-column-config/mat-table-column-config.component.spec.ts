import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatTableColumnConfigComponent } from "./mat-table-column-config.component";

describe("MatTableColumnConfigComponent", () => {
  let component: MatTableColumnConfigComponent;
  let fixture: ComponentFixture<MatTableColumnConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTableColumnConfigComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MatTableColumnConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
