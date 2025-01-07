import { moveItemInArray } from "@angular/cdk/drag-drop";
import { Directive, signal, WritableSignal } from "@angular/core";
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
})
export class MatMultiSortDirective extends MatSort {
  /**
   * A writable signal that holds an array of Sort objects.
   * This signal is used to manage the sorting state of the table.
   *
   * @readonly
   */
  readonly _sorts: WritableSignal<Sort[]> = signal([]);

  /**
   * Retrieves the sort direction for a given column ID.
   *
   * @param id - The ID of the column to get the sort direction for.
   * @returns The sort direction ('asc', 'desc', or '') for the specified column ID.
   */
  getSortDirection(id: string): SortDirection {
    const sort = this._sorts().find((e) => e.active === id);
    return sort ? sort.direction : "";
  }

  /**
   * Gets the sort index of the given column ID.
   *
   * @param id - The ID of the column to get the sort index for.
   * @returns The sort index of the column, or -1 if the column is not active.
   */
  public getSortIndex(id: string): number {
    return this._sorts().findIndex((e) => e.active === id);
  }

  override sort(sortable: MatSortable): void {
    this.active = sortable.id;
    this.direction = this.getSortDirection(sortable.id);
    const index = this.getSortIndex(sortable.id);

    // If the column is not active, add it to the list of active columns.
    if (index < 0) {
      this.direction = sortable.start ? sortable.start : this.start;
      this._sorts().push({ active: this.active, direction: this.direction });
    } else {
      // If the column is active, update the direction or remove it if the direction is empty.
      this.direction = this.getNextSortDirection(sortable);
      if (!this.direction) {
        this._sorts().splice(index, 1);
      } else {
        this._sorts()[index].direction = this.direction;
      }
    }

    this.sortChange.emit({ active: this.active, direction: this.direction });
  }

  /**
   * Removes a sort level by its identifier.
   * If the sort level is not found, the method returns without making any changes.
   *
   * @param id - The identifier of the sort level to be removed.
   * @returns void
   */
  removeSortLevel(id: string): void {
    const index = this.getSortIndex(id);
    if (index < 0) return;

    this._sorts().splice(index, 1);
    this.sortChange.emit();
  }

  /**
   * Reorders the sort level by moving an item in the sort array from a previous index to a current index.
   * If the previous index is the same as the current index, the function returns without making any changes.
   *
   * @param previousIndex - The index of the item to be moved.
   * @param currentIndex - The index to which the item should be moved.
   */
  reorderSortLevel(previousIndex: number, currentIndex: number): void {
    if (previousIndex === currentIndex) return;

    moveItemInArray(this._sorts(), previousIndex, currentIndex);
    this.sortChange.emit(this._sorts()[currentIndex]);
  }

  /**
   * Toggles the sort direction for the given column ID.
   *
   * @param id - The unique identifier of the column to toggle the sort direction for.
   * @returns void
   */
  toggleSortDirection(id: string): void {
    const index = this.getSortIndex(id);
    if (index < 0) return;

    this.active = id;
    // The value of this.direction is used in the getNextSortDirection method. That's why it is necessary for it to be set before the call to getNextSortDirection.
    this.direction = this.getSortDirection(id);
    this.direction = this.getNextSortDirection({
      id: id,
      disableClear: true,
    } as MatSortable);
    this._sorts()[index].direction = this.direction;
    this.sortChange.emit({ active: this.active, direction: this.direction });
  }
}
