import { Inject, Injectable, Optional } from "@angular/core";
import {
  COLUMN_CONFIG_PERSISTENCE_ENABLED,
  COLUMN_CONFIG_PERSISTENCE_KEY,
  COLUMN_CONFIG_PERSISTENCE_STORAGE,
  TableColumn,
} from "./mat-table-column-config";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MatTableColumnConfigPersistenceService<T> {
  private readonly columns$ = new BehaviorSubject<TableColumn<T>[]>([]);

  public get columns(): TableColumn<T>[] {
    return this.columns$.getValue();
  }

  public set columns(value: TableColumn<T>[]) {
    this.columns$.next(value);
    this.persistColumnConfig(value);
  }

  constructor(
    @Optional()
    @Inject(COLUMN_CONFIG_PERSISTENCE_ENABLED)
    private readonly isPersistenceEnabled: boolean,
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

    // effect(() => {
    //   // const length = this.columns().length;
    //   // this.sortChange.emit({
    //   //   active: length ? this._sorts()[length - 1].active : "",
    //   //   direction: length ? this._sorts()[length - 1].direction : "",
    //   // });
    //   this.persistSortSettings();
    // });
  }

  public getColumns(): Observable<TableColumn<T>[]> {
    return this.columns$.asObservable();
  }

  private persistColumnConfig(columns: TableColumn<T>[]): void {
    if (!this.isPersistenceEnabled) return;
    this.storage.setItem(this.key, JSON.stringify(columns));
  }
}
