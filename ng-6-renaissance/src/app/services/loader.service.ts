import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _loaders: string[] = [];

  get loader() {
    return this._loaders.length > 0;
  }

  show(value: string) {
    this._loaders.push(value);
  }

  hide(value: string) {
    this._loaders = this._loaders.filter((loader) => loader !== value);
  }
}
