import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { TaskModel } from "@shared/models/task-model";
import { LogicService } from "@shared/services/logic.service";

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.scss']
})
export class TaskDashboardComponent implements OnInit {
  tasks$: Observable<TaskModel[]>;
  totalTime$: Observable<number>;

  constructor(private service: LogicService) {
  }

  ngOnInit(): void {
    this.tasks$ = this.service.tasks$;
    this.totalTime$ = this.service.totalTime$;
  }

  public onClick(evt: TaskModel) {
    this.service.updateTask(evt);
  }
}
