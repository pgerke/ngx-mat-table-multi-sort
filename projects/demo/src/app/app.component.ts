import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from "@angular/core";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import {
  MatMultiSortControlComponent,
  MatMultiSortDirective,
  MatMultiSortHeaderComponent,
  MatMultiSortTableDataSource,
  MatTableColumnConfigTriggerDirective,
  TableColumn,
} from "../../../../src/public-api";
import { MEMBER_DATA, MemberInformation } from "./data";

/**
 * The version of the application.
 */
const APP_VERSION = "DEBUG";

@Component({
  selector: "app-root",
  imports: [
    MatChipsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatMultiSortDirective,
    MatMultiSortControlComponent,
    MatMultiSortHeaderComponent,
    MatTableColumnConfigTriggerDirective,
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
   * Defines the columns for the table displaying member information.
   * Each column is represented by an object containing the following properties:
   * - `id`: A unique identifier for the column.
   * - `label`: The display name of the column.
   * - `visible`: A boolean indicating whether the column should be visible.
   *
   * The columns are:
   * - `id`: ID of the member (hidden by default).
   * - `name`: Name of the member.
   * - `age`: Age of the member.
   * - `active`: Indicates if the member is active.
   * - `joinDate`: The date the member joined.
   * - `score`: The score of the member.
   * - `department`: The department the member belongs to.
   * - `comment`: Additional comments about the member.
   */
  readonly columns: TableColumn<MemberInformation>[] = [
    { id: "id", label: "ID", visible: false },
    { id: "name", label: "Name", visible: true },
    { id: "age", label: "Age", visible: true },
    { id: "active", label: "Active", visible: true },
    { id: "joinDate", label: "Join Date", visible: true },
    { id: "score", label: "Score", visible: true },
    { id: "department", label: "Department", visible: true },
    { id: "comment", label: "Comment", visible: true },
  ];

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
  get displayedColumns(): (keyof MemberInformation)[] {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.id);
  }

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

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.sort._sorts.set([
      { active: "active", direction: "desc" },
      { active: "department", direction: "asc" },
      { active: "score", direction: "desc" },
    ]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
  }
}
