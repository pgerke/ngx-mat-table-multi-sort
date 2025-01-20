import { Overlay } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Injector,
  Input,
  ViewContainerRef,
} from "@angular/core";
import { TABLE_COLUMNS, TableColumn } from "./mat-table-column-config";
import { MatTableColumnConfigComponent } from "./mat-table-column-config/mat-table-column-config.component";

@Directive({
  selector: "[matTableColumnConfigTrigger]",
  exportAs: "matTableColumnConfigTrigger",
})
export class MatTableColumnConfigTriggerDirective<T> {
  private _componentRef: ComponentRef<MatTableColumnConfigComponent<T>> | null =
    null;
  /**
   * Input property that accepts an array of table column configurations.
   * The alias for this input property is "matTableColumnConfigTrigger".
   * This property is required.
   *
   * @type {TableColumn<T>[]} columns - The array of table column configurations.
   */
  @Input({ alias: "matTableColumnConfigTrigger", required: true })
  columns!: TableColumn<T>[];

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
    const injector = Injector.create({
      providers: [{ provide: TABLE_COLUMNS, useValue: this.columns }],
      parent: this.viewContainerRef.injector,
    });
    const portal = new ComponentPortal(
      MatTableColumnConfigComponent<T>,
      this.viewContainerRef,
      injector
    );
    this._componentRef = overlayRef.attach(portal);

    overlayRef.backdropClick().subscribe(() => {
      overlayRef.detach();
      overlayRef.dispose();
      this._componentRef = null;
    });
  }
}
