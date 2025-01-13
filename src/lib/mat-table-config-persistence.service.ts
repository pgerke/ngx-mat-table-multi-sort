import { Inject, Injectable, InjectionToken } from "@angular/core";

export const MAT_TABLE_STORAGE = new InjectionToken<Storage>(
  "MAT_TABLE_STORAGE"
);

@Injectable({
  providedIn: "root",
})
export class MatTableConfigPersistenceService {
  public enabled = true;

  constructor(@Inject(MAT_TABLE_STORAGE) private readonly storage: Storage) {}
}
