import { Directive } from "@angular/core";
import {
  MatSort,
  MatSortable,
  Sort,
  SortDirection,
} from "@angular/material/sort";

@Directive({
  selector: "[matMultiSort]",
  exportAs: "matMultiSort",
  host: {
    class: "mat-sort",
  },
  standalone: true,
})
export class MatMultiSortDirective extends MatSort {
  readonly _sorts: Sort[] = [];

  /**
   * Retrieves the sort direction for a given column ID.
   *
   * @param id - The ID of the column to get the sort direction for.
   * @returns The sort direction ('asc', 'desc', or '') for the specified column ID.
   */
  getSortDirection(id: string): SortDirection {
    const sort = this._sorts.find((e) => e.active === id);
    return sort ? sort.direction : "";
  }

  /**
   * Gets the sort index of the given column ID.
   *
   * @param id - The ID of the column to get the sort index for.
   * @returns The sort index of the column, or -1 if the column is not active.
   */
  public getSortIndex(id: string): number {
    return this._sorts.findIndex((e) => e.active === id);
  }

  override sort(sortable: MatSortable): void {
    this.active = sortable.id;
    this.direction = this.getSortDirection(sortable.id);
    const index = this.getSortIndex(sortable.id);

    // If the column is not active, add it to the list of active columns.
    if (index < 0) {
      this.direction = sortable.start ? sortable.start : this.start;
      this._sorts.push({ active: this.active, direction: this.direction });
    } else {
      // If the column is active, update the direction or remove it if the direction is empty.
      this.direction = this.getNextSortDirection(sortable);
      if (!this.direction) {
        this._sorts.splice(index, 1);
      } else {
        this._sorts[index].direction = this.direction;
      }
    }

    this.sortChange.emit({ active: this.active, direction: this.direction });
  }
}
