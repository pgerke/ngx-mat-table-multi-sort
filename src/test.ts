import { TableColumn } from "./lib/mat-table-column-config";

export interface Test {
  id: string;
  name: string;
  value: number;
}

export function generateColumns(): TableColumn<Test>[] {
  return [
    { id: "id", label: "ID", visible: false },
    { id: "name", label: "Name", visible: true },
    { id: "value", label: "Value", visible: true },
  ];
}
