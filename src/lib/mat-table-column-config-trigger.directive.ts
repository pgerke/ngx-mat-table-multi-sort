import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  ViewContainerRef,
} from "@angular/core";
import { MatTableColumnConfigComponent } from "../public-api";

@Directive({
  selector: "[matTableColumnConfigTrigger]",
  exportAs: "matTableColumnConfigTrigger",
})
export class MatTableColumnConfigTriggerDirective {
  private componentRef?: ComponentRef<MatTableColumnConfigComponent>;
  private overlayRef?: OverlayRef;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly overlay: Overlay,
    private readonly viewContainerRef: ViewContainerRef
  ) {}
  @HostListener("click")
  onClick(): void {
    // If the component or overlay is already open, do nothing
    if (this.componentRef || this.overlayRef) return;

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
    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: "cdk-overlay-transparent-backdrop",
    });
    const portal = new ComponentPortal(
      MatTableColumnConfigComponent,
      this.viewContainerRef
    );
    this.overlayRef.attach(portal);
    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef!.detach();
      this.overlayRef!.dispose();
      this.overlayRef = undefined;
      this.componentRef?.destroy();
      this.componentRef = undefined;
    });
  }
}
