import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { TaskModel } from '@shared/models/task-model';

@Component({
  selector: 'app-task-presenter',
  templateUrl: './task-presenter.component.html',
  styleUrls: ['./task-presenter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskPresenterComponent {
  @Input() task: TaskModel;
  @Output() toggleTaskEvent = new EventEmitter<number>();

  constructor() {
  }

  toggleTask() {
    this.toggleTaskEvent.emit(this.task.id);
  }
}
