import { MatMultiSortTableDataSource } from "./mat-multi-sort-table-data-source";

describe("MatMultiSortTableDataSource", () => {
  it("should be create", () => {
    const dataSource = new MatMultiSortTableDataSource();
    expect(dataSource).toBeTruthy();
  });
});
