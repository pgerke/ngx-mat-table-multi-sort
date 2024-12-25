import { Directive, OnDestroy, OnInit } from "@angular/core";
import { MatSort, Sort, SortDirection } from "@angular/material/sort";
import { debounceTime, Subscription } from "rxjs";

@Directive({
  selector: "[matMultiSort]",
  exportAs: "matMultiSort",
  host: {
    class: "mat-sort",
  },
})
export class MatMultiSortDirective
  extends MatSort
  implements OnInit, OnDestroy
{
  readonly _sorts: Sort[] = [];
  private sortChangeSubscription?: Subscription;

  override ngOnInit(): void {
    super.ngOnInit();
    this.sortChangeSubscription = this.sortChange
      .pipe(debounceTime(200)) // In a "normal" sort operation, the event is triggered multiple times, so we debounce it to only get the last event with the correct, final direction.
      .subscribe((change) => this.processSortChange(change));
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.sortChangeSubscription?.unsubscribe();
    this.sortChangeSubscription = undefined;
  }

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

  private processSortChange(change: Sort): void {
    const index = this.getSortIndex(change.active);

    // If the column is not active, add it to the list of active columns.
    if (index < 0) {
      this._sorts.push(change);
      return;
    }

    // If the column is active, update the direction or remove it if the direction is empty.
    if (change.direction === "") {
      this._sorts.splice(index, 1);
      return;
    } else {
      this._sorts[index].direction = change.direction;
    }
  }
}
