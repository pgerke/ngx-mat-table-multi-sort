import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import {
  MatMultiSortDirective,
  MatMultiSortHeaderComponent,
  MatMultiSortTableDataSource,
} from "../../../../src/public-api";
import { MEMBER_DATA, MemberInformation } from "./data";

/**
 * The version of the application.
 */
const APP_VERSION = "DEBUG";

@Component({
  selector: "app-root",
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatMultiSortDirective,
    MatMultiSortHeaderComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
/**
 * The main component for the ngx-mat-table-multi-sort demo application.
 * It initializes the data source and sets up pagination and sorting for the table.
 *
 * @implements {AfterViewInit}
 */
export class AppComponent implements AfterViewInit {
  /**
   * The current year based on the system's date.
   * This value is set when the component is initialized.
   */

  readonly currentYear = new Date().getFullYear();

  /**
   * A data source for the Material table that holds and manages the data of type `MemberInformation`.
   * It is initialized with the provided `MEMBER_DATA`.
   *
   * @readonly
   * @type {MatMultiSortTableDataSource<MemberInformation>}
   */
  readonly dataSource = new MatMultiSortTableDataSource<MemberInformation>(
    MEMBER_DATA
  );

  /**
   * An array of strings representing the columns to be displayed in the table.
   * Each string corresponds to a column identifier.
   *
   */
  readonly displayedColumns: (keyof MemberInformation)[] = Object.keys(
    MEMBER_DATA[0]
  ) as (keyof MemberInformation)[];

  /**
   * Reference to the MatPaginator component, used to control pagination in the table.
   * This is decorated with @ViewChild to get a handle on the paginator instance.
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
   * Reference to the MatMultiSort directive, which is used to manage the sorting of table columns.
   * This is used to provide sorting functionality to the Angular Material table.
   */
  @ViewChild(MatMultiSortDirective) sort!: MatMultiSortDirective;

  /**
   * The title of the application, displayed in the UI.
   * This is a read-only property.
   */
  readonly title = "ngx-mat-table-multi-sort Demo";

  /**
   * The current version of the application.
   * This value is read-only and is set from the build configuration.
   */
  readonly version = APP_VERSION;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
