import { Directive } from "@angular/core";
import { MatSort, SortDirection } from "@angular/material/sort";

@Directive({
  selector: "[matMultiSort]",
  exportAs: "matMultiSort",
})
export class MatMultiSortDirective extends MatSort {
  private readonly actives: string[] = [];
  private readonly directions: SortDirection[] = [];

  /**
   * Gets the sort index of the given column ID.
   *
   * @param id - The ID of the column to get the sort index for.
   * @returns The sort index of the column, or -1 if the column is not active.
   */
  public getSortIndex(id: string): number {
    return this.actives.indexOf(id);
  }
}
