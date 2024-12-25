import { NgIf } from "@angular/common";
import { Component, inject, OnInit, ViewEncapsulation } from "@angular/core";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import { MatMultiSortDirective } from "../mat-multi-sort.directive";

@Component({
  selector: "[mat-multi-sort-header]", // eslint-disable-line @angular-eslint/component-selector
  exportAs: "matMultiSortHeader",
  imports: [NgIf],
  providers: [{ provide: MatSort, useExisting: MatMultiSortDirective }],
  templateUrl: "./mat-multi-sort-header.component.html",
  styleUrl: "./mat-multi-sort-header.component.scss",
  host: {
    class: "mat-sort-header",
    "(click)": "_toggleOnInteraction()",
    "(keydown)": "_handleKeydown($event)",
    "(mouseleave)": "_recentlyCleared.set(false)",
    "[attr.aria-sort]": "_getAriaSortAttribute()",
    "[class.mat-sort-header-disabled]": "_isDisabled()",
  },
  encapsulation: ViewEncapsulation.None,
})
export class MatMultiSortHeaderComponent
  extends MatSortHeader
  implements OnInit
{
  override readonly _sort: MatMultiSortDirective = inject(
    MatMultiSortDirective,
    {
      optional: true,
    }
  )!;

  /**
   * Gets the sort index for the current column.
   *
   * @returns {number} The index of the sort order for this column.
   */
  get sortId(): number {
    return this._sort.getSortIndex(this.id);
  }
}
