import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loaders$ = signal<string[]>([]);
  
  show(value: string) {
    this.loaders$.set([...this.loaders$(), value]);
  }

  hide(value: string) {
    this.loaders$.set(this.loaders$().filter((loader) => loader !== value));
  }
}
