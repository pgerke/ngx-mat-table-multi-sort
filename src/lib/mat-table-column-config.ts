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

/**
 * Injection token for the storage mechanism used to persist column configuration.
 *
 * This token can be used to provide a custom storage implementation for saving
 * and retrieving the state of table column configurations.
 *
 */
export const COLUMN_CONFIG_PERSISTENCE_STORAGE = new InjectionToken<Storage>(
  "COLUMN_CONFIG_PERSISTENCE_STORAGE"
);

/**
 * Injection token used to enable or disable column configuration persistence.
 *
 * This token can be provided with a boolean value to indicate whether the
 * column configurations should be persisted (e.g., in local storage or a database).
 *
 */
export const COLUMN_CONFIG_PERSISTENCE_ENABLED = new InjectionToken<boolean>(
  "COLUMN_CONFIG_PERSISTENCE_ENABLED"
);

/**
 * Injection token for the column configuration persistence key.
 * This token is used to provide a unique key for persisting column configurations.
 */
export const COLUMN_CONFIG_PERSISTENCE_KEY = new InjectionToken<string>(
  "COLUMN_CONFIG_PERSISTENCE_KEY"
);
