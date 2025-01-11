import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { generateColumns, Test } from "../test";
import { MatTableColumnConfigTriggerDirective } from "./mat-table-column-config-trigger.directive";

@Component({ template: "" })
export class TestComponent extends MatTableColumnConfigTriggerDirective<Test> {}

describe("MatTableColumnConfigTriggerDirective", () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    component.columns = generateColumns();
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
