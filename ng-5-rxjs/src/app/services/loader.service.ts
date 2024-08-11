import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _loader = false;

  get loader() {
    return this._loader;
  }

  show() {
    this._loader = true;
  }

  hide() {
    this._loader = false;
  }
}
