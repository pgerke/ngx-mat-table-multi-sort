import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatMultiSortControlComponent } from "./mat-multi-sort-control.component";

describe("MatMultiSortControlComponent", () => {
  let component: MatMultiSortControlComponent;
  let fixture: ComponentFixture<MatMultiSortControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatMultiSortControlComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MatMultiSortControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
