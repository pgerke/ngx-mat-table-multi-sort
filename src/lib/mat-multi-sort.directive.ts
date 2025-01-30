import { moveItemInArray } from "@angular/cdk/drag-drop";
import {
  Directive,
  effect,
  EventEmitter,
  Inject,
  InjectionToken,
  Optional,
  Output,
  signal,
  WritableSignal,
} from "@angular/core";
import {
  MAT_SORT_DEFAULT_OPTIONS,
  MatSort,
  MatSortable,
  MatSortDefaultOptions,
  Sort,
  SortDirection,
} from "@angular/material/sort";

export const SORT_PERSISTENCE_STORAGE = new InjectionToken<Storage>(
  "SORT_PERSISTENCE_STORAGE"
);

export const SORT_PERSISTENCE_ENABLED = new InjectionToken<boolean>(
  "SORT_PERSISTENCE_ENABLED"
);

export const SORT_PERSISTENCE_KEY = new InjectionToken<string>(
  "SORT_PERSISTENCE_KEY"
);

@Directive({
  selector: "[matMultiSort]",
  exportAs: "matMultiSort",
  host: {
    class: "mat-sort",
  },
})
export class MatMultiSortDirective extends MatSort {
  @Output()
  private readonly persistenceChanged = new EventEmitter<Sort[]>();

  /**
   * A writable signal that holds an array of Sort objects.
   * This signal is used to manage the sorting state of the table.
   *
   * @readonly
   */
  readonly _sorts: WritableSignal<Sort[]> = signal([]);

  constructor(
    @Optional()
    @Inject(SORT_PERSISTENCE_ENABLED)
    public isPersistenceEnabled: boolean,
    @Optional()
    @Inject(SORT_PERSISTENCE_KEY)
    private readonly key: string,
    @Optional()
    @Inject(SORT_PERSISTENCE_STORAGE)
    private readonly storage: Storage,
    @Optional()
    @Inject(MAT_SORT_DEFAULT_OPTIONS)
    defaultOptions?: MatSortDefaultOptions | undefined
  ) {
    super(defaultOptions);

    this.isPersistenceEnabled ??= true;
    this.key ??= "mat-table-persistence-sort";
    this.storage ??= localStorage;

    if (this.isPersistenceEnabled) {
      const sortsSerialized = this.storage.getItem(this.key);
      this._sorts.set(sortsSerialized ? JSON.parse(sortsSerialized) : []);
    }

    effect(() => {
      const length = this._sorts().length;
      this.sortChange.emit({
        active: length ? this._sorts()[length - 1].active : "",
        direction: length ? this._sorts()[length - 1].direction : "",
      });
      this.persistSortSettings();
    });
  }

  /**
   * Retrieves the sort direction for a given column ID.
   *
   * @param id - The ID of the column to get the sort direction for.
   * @returns The sort direction ('asc', 'desc', or '') for the specified column ID.
   */
  public getSortDirection(id: string): SortDirection {
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
    this.persistSortSettings();
  }

  /**
   * Removes a sort level by its identifier.
   * If the sort level is not found, the method returns without making any changes.
   *
   * @param id - The identifier of the sort level to be removed.
   * @returns void
   */
  public removeSortLevel(id: string): void {
    const index = this.getSortIndex(id);
    if (index < 0) return;

    this._sorts().splice(index, 1);
    this.sortChange.emit();
    this.persistSortSettings();
  }

  /**
   * Reorders the sort level by moving an item in the sort array from a previous index to a current index.
   * If the previous index is the same as the current index, the function returns without making any changes.
   *
   * @param previousIndex - The index of the item to be moved.
   * @param currentIndex - The index to which the item should be moved.
   */
  public reorderSortLevel(previousIndex: number, currentIndex: number): void {
    if (previousIndex === currentIndex) return;

    moveItemInArray(this._sorts(), previousIndex, currentIndex);
    this.sortChange.emit(this._sorts()[currentIndex]);
    this.persistSortSettings();
  }

  /**
   * Toggles the sort direction for the given column ID.
   *
   * @param id - The unique identifier of the column to toggle the sort direction for.
   * @returns void
   */
  public toggleSortDirection(id: string): void {
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
    this.persistSortSettings();
  }

  /**
   * Clears the current sorting state.
   *
   * @param id - The unique identifier of the column to toggle the sort direction for.
   * @returns void
   */
  public clearSorting(): void {
    this.active = "";
    this.direction = "";
    this._sorts.set([]);
    this.sortChange.emit();
    this.persistSortSettings();
  }

  private persistSortSettings(): void {
    this.persistenceChanged.emit(this._sorts());
    if (this.isPersistenceEnabled)
      this.storage.setItem(this.key, JSON.stringify(this._sorts()));
  }
}
