import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import {
  COLUMN_CONFIG_PERSISTENCE_ENABLED,
  SORT_PERSISTENCE_ENABLED,
} from "../../../../src/public-api";

/**
 * Configuration object for the application.
 *
 * @constant
 * @type {ApplicationConfig}
 *
 * @property {Array} providers - An array of providers used in the application.
 * @property {Function} providers[].provideAnimations - Enables animations in the application.
 * @property {Function} providers[].provideZoneChangeDetection - Configures zone change detection with event coalescing enabled.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    { provide: SORT_PERSISTENCE_ENABLED, useValue: false },
    { provide: COLUMN_CONFIG_PERSISTENCE_ENABLED, useValue: false },
  ],
};
