import { Overlay } from "@angular/cdk/overlay";
import { Component } from "@angular/core";
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from "@angular/core/testing";
import { Test } from "../test";
import { MatTableColumnConfigTriggerDirective } from "./mat-table-column-config-trigger.directive";

@Component({ template: "" })
export class TestComponent extends MatTableColumnConfigTriggerDirective<Test> {}

describe("MatTableColumnConfigTriggerDirective", () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let overlay: Overlay;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [Overlay],
    }).compileComponents();

    overlay = TestBed.inject(Overlay);
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should create and dismiss overlay", fakeAsync(() => {
    expect(component.componentRef).toBeNull();
    const createSpy = spyOn(overlay, "create").and.callThrough();
    component.onClick();
    expect(createSpy).toHaveBeenCalled();
    const overlayRef = createSpy.calls.mostRecent().returnValue;
    const disposeSpy = spyOn(overlayRef, "dispose").and.callThrough();
    expect(overlayRef.hasAttached()).toBeTrue();
    expect(overlayRef.backdropElement).not.toBeNull();
    expect(component.componentRef).not.toBeNull();
    overlayRef.backdropElement!.click();
    tick();
    expect(component.componentRef).toBeNull();
    expect(disposeSpy).toHaveBeenCalled();
  }));
});
