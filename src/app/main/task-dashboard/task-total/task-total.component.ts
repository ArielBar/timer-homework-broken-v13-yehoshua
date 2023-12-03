import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-task-total',
  templateUrl: './task-total.component.html',
  styleUrls: ['./task-total.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskTotalComponent {
  @Input() totalTime: number;

  constructor() {
  }
}
