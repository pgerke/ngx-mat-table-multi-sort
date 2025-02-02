import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from "@angular/cdk/drag-drop";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { Subscription } from "rxjs";
import { TableColumn } from "../mat-table-column-config";
import { MatTableColumnConfigPersistenceService } from "../mat-table-column-config-persistence.service";

@Component({
  selector: "mat-table-column-config",
  imports: [CdkDropList, CdkDrag, MatCheckboxModule, MatIconModule],
  templateUrl: "./mat-table-column-config.component.html",
  styleUrl: "./mat-table-column-config.component.scss",
})
export class MatTableColumnConfigComponent<T> implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;
  columns: TableColumn<T>[] = [];

  constructor(
    private readonly persistenceService: MatTableColumnConfigPersistenceService<T>
  ) {}

  ngOnInit(): void {
    this.subscription = this.persistenceService
      .getColumns()
      .subscribe((columns) => {
        this.columns = columns;
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscription = undefined;
  }

  /**
   * Handles the event when a dragged column is dropped.
   * This method updates the order of columns based on the drag and drop action.
   *
   * @param event - The event object containing information about the drag and drop action.
   */
  onColumnDropped(event: CdkDragDrop<T>): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    this.persistenceService.columns = this.columns;
  }

  /**
   * Toggles the visibility of a column based on its identifier.
   *
   * @param id - The identifier of the column whose visibility is to be changed.
   */
  onColumnVisibilityChanged(id: keyof T): void {
    const index = this.columns.findIndex((column) => column.id === id);
    if (index < 0) return;

    this.columns[index].visible = !this.columns[index].visible;
    this.persistenceService.columns = this.columns;
  }
}
