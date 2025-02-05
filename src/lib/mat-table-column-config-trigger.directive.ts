import { Overlay } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  ViewContainerRef,
} from "@angular/core";
import { MatTableColumnConfigComponent } from "./mat-table-column-config/mat-table-column-config.component";

@Directive({
  selector: "[matTableColumnConfigTrigger]",
  exportAs: "matTableColumnConfigTrigger",
  standalone: true,
})
export class MatTableColumnConfigTriggerDirective<T> {
  private _componentRef: ComponentRef<MatTableColumnConfigComponent<T>> | null =
    null;

  /**
   * Gets the reference to the MatTableColumnConfigComponent.
   *
   * @returns {ComponentRef<MatTableColumnConfigComponent<T>> | null}
   *          The reference to the MatTableColumnConfigComponent if it exists, otherwise null.
   */
  get componentRef(): ComponentRef<MatTableColumnConfigComponent<T>> | null {
    return this._componentRef;
  }

  constructor(
    private readonly elementRef: ElementRef,
    private readonly overlay: Overlay,
    private readonly viewContainerRef: ViewContainerRef
  ) {}

  @HostListener("click")
  onClick(): void {
    // Create the component portal
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef.nativeElement)
      .withFlexibleDimensions(true)
      .withViewportMargin(8)
      .withGrowAfterOpen(true)
      .withPush(true)
      .withPositions([
        {
          originX: "end",
          originY: "bottom",
          overlayX: "end",
          overlayY: "top",
        },
      ]);
    const overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: "cdk-overlay-transparent-backdrop",
    });
    const portal = new ComponentPortal(
      MatTableColumnConfigComponent<T>,
      this.viewContainerRef,
      this.viewContainerRef.injector
    );
    this._componentRef = overlayRef.attach(portal);

    overlayRef.backdropClick().subscribe(() => {
      overlayRef.detach();
      overlayRef.dispose();
      this._componentRef = null;
    });
  }
}
