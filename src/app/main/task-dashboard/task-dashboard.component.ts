import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { TaskModel } from "@shared/models/task-model";
import { LogicService } from "@shared/services/logic.service";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.scss']
})
export class TaskDashboardComponent implements OnInit {
  tasks$: Observable<TaskModel[]>;
  totalTime$: Observable<number>;
  existingTasksNames$: Observable<string[]>;

  constructor(private service: LogicService) {
  }

  ngOnInit(): void {
    this.tasks$ = this.service.tasks$;
    this.totalTime$ = this.service.totalTime$;
    this.existingTasksNames$ = this.tasks$.pipe(
      map((tasks: TaskModel[]) => tasks.map((task: TaskModel) => task.name))
    )
  }

  onClick(evt: TaskModel) {
    this.service.updateTask(evt);
  }
}
