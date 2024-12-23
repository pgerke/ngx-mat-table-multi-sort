import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";

/**
 * Represents an element in the periodic table.
 *
 * @interface PeriodicElement
 * @property {string} name - The name of the element.
 * @property {number} position - The position of the element in the periodic table.
 * @property {number} weight - The atomic weight of the element.
 * @property {string} symbol - The chemical symbol of the element.
 */
interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

/**
 * The version of the application.
 */
const APP_VERSION = "DEBUG";

/**
 * An array of objects representing periodic elements.
 * Each object contains the following properties:
 * - `position`: The atomic number of the element.
 * - `name`: The name of the element.
 * - `weight`: The atomic weight of the element.
 * - `symbol`: The chemical symbol of the element.
 */
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
  { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
  { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
  { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
  { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
  { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
  { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
  { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
  { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
  { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" },
  { position: 11, name: "Sodium", weight: 22.9897, symbol: "Na" },
  { position: 12, name: "Magnesium", weight: 24.305, symbol: "Mg" },
  { position: 13, name: "Aluminum", weight: 26.9815, symbol: "Al" },
  { position: 14, name: "Silicon", weight: 28.0855, symbol: "Si" },
  { position: 15, name: "Phosphorus", weight: 30.9738, symbol: "P" },
  { position: 16, name: "Sulfur", weight: 32.065, symbol: "S" },
  { position: 17, name: "Chlorine", weight: 35.453, symbol: "Cl" },
  { position: 18, name: "Argon", weight: 39.948, symbol: "Ar" },
  { position: 19, name: "Potassium", weight: 39.0983, symbol: "K" },
  { position: 20, name: "Calcium", weight: 40.078, symbol: "Ca" },
];

@Component({
  selector: "app-root",
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
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
   * A data source for the Material table that holds and manages the data of type `PeriodicElement`.
   * It is initialized with the provided `elementData`.
   *
   * @readonly
   * @type {MatTableDataSource<PeriodicElement>}
   */
  readonly dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  /**
   * An array of strings representing the columns to be displayed in the table.
   * Each string corresponds to a column identifier.
   *
   * Columns:
   * - "position": The position of the element in the periodic table.
   * - "name": The name of the element.
   * - "weight": The atomic weight of the element.
   * - "symbol": The chemical symbol of the element.
   */
  readonly displayedColumns: string[] = [
    "position",
    "name",
    "weight",
    "symbol",
  ] as const;

  /**
   * Reference to the MatPaginator component, used to control pagination in the table.
   * This is decorated with @ViewChild to get a handle on the paginator instance.
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
   * Reference to the MatSort directive, which is used to manage the sorting of table columns.
   * This is used to provide sorting functionality to the Angular Material table.
   */
  @ViewChild(MatSort) sort!: MatSort;

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
