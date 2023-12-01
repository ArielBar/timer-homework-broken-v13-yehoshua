import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskModel } from '@shared/models/task-model';
import { LogicService } from '@shared/services/logic.service';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskContainerComponent implements OnInit {
  tasks$: Observable<TaskModel[]>;
  totalTime$: Observable<number>;

  constructor(private service: LogicService) {
  }

  ngOnInit() {
    this.tasks$ = this.service.tasks$;
    this.totalTime$ = this.service.totalTime$;
  }

  public onClick(evt: TaskModel) {
    this.service.updateTask(evt);
  }
}
