import { InjectionToken } from "@angular/core";

/**
 * Represents the configuration for a table column.
 *
 * @template T - The type of the data object that the table displays.
 */
export interface TableColumn<T> {
  id: keyof T;
  label: string;
  visible: boolean;
}

export const COLUMN_CONFIG_PERSISTENCE_STORAGE = new InjectionToken<Storage>(
  "COLUMN_CONFIG_PERSISTENCE_STORAGE"
);

export const COLUMN_CONFIG_PERSISTENCE_ENABLED = new InjectionToken<boolean>(
  "COLUMN_CONFIG_PERSISTENCE_ENABLED"
);

export const COLUMN_CONFIG_PERSISTENCE_KEY = new InjectionToken<string>(
  "COLUMN_CONFIG_PERSISTENCE_KEY"
);

// /**
//  * Injection token for providing table column configurations.
//  *
//  * This token is used to inject an array of `TableColumn` configurations
//  * into Angular components or services. The generic type `unknown` is used
//  * to allow for flexibility in the type of data that can be represented
//  * by the table columns.
//  */
// export const TABLE_COLUMNS = new InjectionToken<TableColumn<unknown>>(
//   "TABLE_COLUMNS"
// );
