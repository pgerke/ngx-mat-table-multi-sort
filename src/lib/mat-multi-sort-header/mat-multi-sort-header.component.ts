import { NgIf } from "@angular/common";
import { Component, inject, OnInit, ViewEncapsulation } from "@angular/core";
import { MatSort, MatSortHeader, SortDirection } from "@angular/material/sort";
import { MatMultiSortDirective } from "../mat-multi-sort.directive";
import { MatTableConfigPersistenceService } from "../mat-table-config-persistence.service";

@Component({
  selector: "[mat-multi-sort-header]", // eslint-disable-line @angular-eslint/component-selector
  exportAs: "matMultiSortHeader",
  imports: [NgIf],
  providers: [{ provide: MatSort, useExisting: MatMultiSortDirective }],
  templateUrl: "./mat-multi-sort-header.component.html",
  styleUrl: "./mat-multi-sort-header.component.scss",
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
   * Retrieves the sort direction for the current column.
   *
   * @returns {SortDirection} The sort direction for the column identified by this.id.
   */
  get sortDirection(): SortDirection {
    return this._sort.getSortDirection(this.id);
  }

  /**
   * Gets the sort index for the current column.
   *
   * @returns {number} The index of the sort order for this column.
   */
  get sortIndex(): number {
    return this._sort.getSortIndex(this.id);
  }

  constructor(
    private readonly persistenceService: MatTableConfigPersistenceService,
    ...args: unknown[]
  ) {
    super(...args);
  }

  override _isSorted(): boolean {
    return this.sortIndex > -1;
  }

  override _toggleOnInteraction(): void {
    if (this._isDisabled()) return;

    const wasSorted = this._isSorted();
    const prevDirection = this.sortDirection;
    this._sort.sort(this);
    this._recentlyCleared.set(
      wasSorted && !this._isSorted() ? prevDirection : null
    );
  }
}
