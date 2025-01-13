import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from "@angular/cdk/drag-drop";
import { Component, Inject } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { TABLE_COLUMNS, TableColumn } from "../mat-table-column-config";
import { MatTableConfigPersistenceService } from "../mat-table-config-persistence.service";

@Component({
  selector: "mat-table-column-config",
  imports: [CdkDropList, CdkDrag, MatCheckboxModule, MatIconModule],
  templateUrl: "./mat-table-column-config.component.html",
  styleUrl: "./mat-table-column-config.component.scss",
})
export class MatTableColumnConfigComponent<T> {
  constructor(
    private readonly persistenceService: MatTableConfigPersistenceService,
    @Inject(TABLE_COLUMNS) readonly columns: TableColumn<T>[]
  ) {}

  /**
   * Handles the event when a dragged column is dropped.
   * This method updates the order of columns based on the drag and drop action.
   *
   * @param event - The event object containing information about the drag and drop action.
   */
  onColumnDropped(event: CdkDragDrop<T>): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
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
  }
}
