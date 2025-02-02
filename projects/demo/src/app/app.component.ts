import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatRadioChange, MatRadioModule } from "@angular/material/radio";
import { Sort } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { Subscription } from "rxjs";
import {
  MatMultiSortControlComponent,
  MatMultiSortDirective,
  MatMultiSortHeaderComponent,
  MatMultiSortTableDataSource,
  MatTableColumnConfigPersistenceService,
  MatTableColumnConfigTriggerDirective,
  TableColumn,
} from "../../../../src/public-api";
import { MEMBER_DATA, MemberInformation } from "./data";

/**
 * The version of the application.
 */
const APP_VERSION = "DEBUG";

const persistenceModeKey = "persistenceMode";
const PersistenceModes = ["Default", "Custom_1", "Custom_2"] as const;
type PersistenceMode = (typeof PersistenceModes)[number];

@Component({
  selector: "app-root",
  imports: [
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatRadioModule,
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
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
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
  columns: TableColumn<MemberInformation>[] = [];

  /**
   * The current year based on the system's date.
   * This value is set when the component is initialized.
   */

  readonly currentYear = new Date().getFullYear();

  private initialized = false;
  private subscription: Subscription | undefined;

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

  persistenceModes = PersistenceModes;
  persistenceMode: PersistenceMode = "Default";

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

  constructor(
    private readonly persistenceService: MatTableColumnConfigPersistenceService<MemberInformation>,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscription = this.persistenceService
      .getColumns()
      .subscribe((columns) => {
        this.columns = columns;
        if (!this.initialized) return;

        sessionStorage.setItem(
          `columns-${this.persistenceMode}`,
          JSON.stringify(columns)
        );
      });
  }

  ngAfterViewInit(): void {
    const mode = sessionStorage.getItem(persistenceModeKey);
    if (PersistenceModes.includes(mode as PersistenceMode)) {
      this.persistenceMode = mode as PersistenceMode;
    }

    this.load();
    this.initialized = true;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscription = undefined;
  }

  load(): void {
    // Load sorts
    const sorts = sessionStorage.getItem(`sorts-${this.persistenceMode}`);
    if (sorts) {
      this.sort._sorts.set(JSON.parse(sorts));
    } else this.resetSorts();

    // Load column config
    const columns = sessionStorage.getItem(`columns-${this.persistenceMode}`);
    if (columns) {
      this.persistenceService.columns = JSON.parse(columns);
    } else this.resetColumns();
  }

  onPersistenceChanged(sorts: Sort[]): void {
    if (!this.initialized) return;

    sessionStorage.setItem(
      `sorts-${this.persistenceMode}`,
      JSON.stringify(sorts)
    );
  }

  onPersistenceModeChanged(event: MatRadioChange): void {
    this.persistenceMode = event.value;
    sessionStorage.setItem(persistenceModeKey, this.persistenceMode);
    this.load();
  }

  reset(): void {
    this.resetColumns();
    this.resetSorts();
  }

  private resetColumns(): void {
    this.persistenceService.columns = [
      { id: "id", label: "ID", visible: this.persistenceMode !== "Default" },
      { id: "name", label: "Name", visible: true },
      { id: "age", label: "Age", visible: true },
      { id: "active", label: "Active", visible: true },
      { id: "joinDate", label: "Join Date", visible: true },
      { id: "score", label: "Score", visible: true },
      { id: "department", label: "Department", visible: true },
      { id: "comment", label: "Comment", visible: true },
    ];
  }

  private resetSorts(): void {
    if (this.persistenceMode === "Default") {
      this.sort._sorts.set([
        { active: "active", direction: "desc" },
        { active: "department", direction: "asc" },
        { active: "score", direction: "desc" },
      ]);
    } else {
      this.sort._sorts.set([]);
    }
  }
}
