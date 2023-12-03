import { Component, OnDestroy } from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-destroyable',
  template: ''
})
export class DestroyableComponent implements OnDestroy {
  destroy$: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
