import { MatPaginator } from "@angular/material/paginator";
import { Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatMultiSortDirective } from "./mat-multi-sort.directive";

/**
 * Sorts two items based on multiple sorting criteria.
 *
 * @description To do this, we iterate over each sort level and compare the values of the active column. If the values are equal, we move to the next sort level. If all sort levels are equal, we return 0.
 *
 * @template T - The type of the items being sorted.
 * @param {T} a - The first item to compare.
 * @param {T} b - The second item to compare.
 * @param {Sort[]} sorts - An array of sorting criteria, where each criterion specifies the property to sort by and the direction of sorting.
 * @returns {number} - A negative number if `a` should come before `b`, a positive number if `a` should come after `b`, or 0 if they are considered equal.
 */
export function MultiCriterionSort<T>(a: T, b: T, sorts: Sort[]): number {
  for (const { active, direction } of sorts) {
    const aValue = a[active as keyof T];
    const bValue = b[active as keyof T];

    const comparison = compareValues(aValue, bValue);

    if (comparison !== 0) {
      return direction === "desc" ? -comparison : comparison;
    }
  }

  return 0; // If all comparisons are equal, preserve original order
}

function compareValues<T>(aValue: T, bValue: T): number {
  if (aValue == null && bValue != null) return 1;
  if (aValue != null && bValue == null) return -1;
  if (aValue == null && bValue == null) return 0;

  if (typeof aValue === "string" && typeof bValue === "string") {
    return aValue.localeCompare(bValue);
  }

  if (aValue > bValue) return 1;
  if (aValue < bValue) return -1;
  return 0;
}

/**
 * A data source class that extends `MatTableDataSource` to support multi-column sorting.
 *
 * @template T The type of data that the table displays.
 * @template P The type of paginator used, defaults to `MatPaginator`.
 *
 * @extends MatTableDataSource<T, P>
 */
export class MatMultiSortTableDataSource<
  T,
  P extends MatPaginator = MatPaginator,
> extends MatTableDataSource<T, P> {
  override get sort(): MatMultiSortDirective | null {
    return super.sort as MatMultiSortDirective;
  }
  override set sort(sort: MatMultiSortDirective | null) {
    super.sort = sort;
  }

  constructor(initialData?: T[]) {
    super(initialData);
    // Set the default sort function
    this.sortData = (data): T[] => this.sortDataFunction(data);
  }

  private sortDataFunction(data: T[]): T[] {
    // Return the data if there is no sort
    if (!this.sort?._sorts().length) return data;

    // Sort the data:
    return data.sort((a, b) => MultiCriterionSort(a, b, this.sort!._sorts()));
  }
}
