import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";

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
  ],
};
