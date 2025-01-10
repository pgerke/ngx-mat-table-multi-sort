import { CdkDrag, CdkDropList } from "@angular/cdk/drag-drop";
import { Component } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "mat-table-column-config",
  imports: [CdkDropList, CdkDrag, MatCheckboxModule, MatIconModule],
  templateUrl: "./mat-table-column-config.component.html",
  styleUrl: "./mat-table-column-config.component.scss",
})
export class MatTableColumnConfigComponent {}
