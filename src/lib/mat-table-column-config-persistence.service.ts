import { Inject, Injectable, Optional } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import {
  COLUMN_CONFIG_PERSISTENCE_ENABLED,
  COLUMN_CONFIG_PERSISTENCE_KEY,
  COLUMN_CONFIG_PERSISTENCE_STORAGE,
  TableColumn,
} from "./mat-table-column-config";

@Injectable({
  providedIn: "root",
})
export class MatTableColumnConfigPersistenceService<T> {
  private readonly columns$ = new BehaviorSubject<TableColumn<T>[]>([]);

  /**
   * Gets the current table columns configuration.
   *
   * @returns {TableColumn<T>[]} An array of table columns.
   */
  public get columns(): TableColumn<T>[] {
    return this.columns$.getValue();
  }

  /**
   * Sets the columns configuration for the table and persists the configuration.
   *
   * @param value - An array of `TableColumn<T>` representing the new column configuration.
   */
  public set columns(value: TableColumn<T>[]) {
    this.columns$.next(value);
    this.persistColumnConfig(value);
  }

  constructor(
    @Optional()
    @Inject(COLUMN_CONFIG_PERSISTENCE_ENABLED)
    public isPersistenceEnabled: boolean,
    @Optional()
    @Inject(COLUMN_CONFIG_PERSISTENCE_KEY)
    private readonly key: string,
    @Optional()
    @Inject(COLUMN_CONFIG_PERSISTENCE_STORAGE)
    private readonly storage: Storage
  ) {
    this.isPersistenceEnabled ??= true;
    this.key ??= "mat-table-persistence-column-config";
    this.storage ??= localStorage;

    if (this.isPersistenceEnabled) {
      const columnsSerialized = this.storage.getItem(this.key);
      this.columns$.next(
        columnsSerialized ? JSON.parse(columnsSerialized) : []
      );
    }
  }

  /**
   * Retrieves an observable stream of table columns.
   *
   * @returns {Observable<TableColumn<T>[]>} An observable that emits an array of table columns.
   */
  public getColumns(): Observable<TableColumn<T>[]> {
    return this.columns$.asObservable();
  }

  private persistColumnConfig(columns: TableColumn<T>[]): void {
    if (!this.isPersistenceEnabled) return;
    this.storage.setItem(this.key, JSON.stringify(columns));
  }
}
