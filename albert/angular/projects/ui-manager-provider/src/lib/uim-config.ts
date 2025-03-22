import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UIMProviderConfig {
  public url: string = null;

  constructor() { }
}
