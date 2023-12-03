import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { mergeMap, Observable, takeUntil, timer, withLatestFrom } from "rxjs";
import { TaskModel } from "@shared/models/task-model";
import { TasksService } from "@shared/services/tasks.service";
import { filter, map } from "rxjs/operators";
import { DestroyableComponent } from "@shared/components/destroyable.component";

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.scss']
})
export class TaskDashboardComponent extends DestroyableComponent implements OnInit {
  tasks$: Observable<TaskModel[]>;
  totalTime$: Observable<number>;
  existingTasksNames$: Observable<string[]>;

  constructor(private tasksService: TasksService,
              private ngZone: NgZone,
              private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.runTaskTimers();

    this.tasks$ = this.tasksService.tasks$;
    this.totalTime$ = this.tasksService.totalTime$;
    this.existingTasksNames$ = this.tasks$.pipe(
      map((tasks: TaskModel[]) => tasks.map((task: TaskModel) => task.name))
    )
  }

  trackByTask(index: number, task: TaskModel) {
    return task.id;
  }

  toggleTask(taskId: number) {
    this.tasksService.toggleTask(taskId);
  }

  addTask(taskName: string) {
    this.tasksService.addTask(taskName);
  }

  private runTaskTimers(): void {
    this.ngZone.runOutsideAngular(() => {
      timer(0, 1000).pipe(
        withLatestFrom(this.tasksService.tasks$),
        mergeMap(([_, tasks]) => tasks),
        filter((task: TaskModel) => task.timer.isRunning),
        takeUntil(this.destroy$)
      ).subscribe((task: TaskModel) => {
        task.timer.emitter$.next(task.timer.emitter$.value + 1);
        this.cd.detectChanges();
      })
    })
  }
}
