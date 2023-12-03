import { Injectable } from '@angular/core';
import { TaskModel } from '@shared/models/task-model';
import { BehaviorSubject, combineLatest, mergeMap, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Timer } from "@shared/models/timer";

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasksState: TaskModel[] = [];
  private tasksStateSubject$ = new BehaviorSubject<TaskModel[]>(this.tasksState)

  constructor() {
  }

  public get tasks$(): Observable<TaskModel[]> {
    return this.tasksStateSubject$.asObservable();
  }

  public get totalTime$(): Observable<number> {
    return this.tasks$.pipe(
      map((tasks: TaskModel[]) => tasks.map((task: TaskModel) => task.timer.emitter$)),
      mergeMap((allTimers: BehaviorSubject<number>[]) => {
        return combineLatest(allTimers).pipe(
          map((allTimerValues: number[]) => allTimerValues.reduce((acc, current) => acc + current, 0))
        );
      })
    )
  }

  addTask(taskName: string): void {
    const newTask = this.createTask(taskName);
    this.tasksState = [...this.tasksState, newTask]
    this.emitNewTasksState();
  }

  toggleTask(taskId: number): void {
    this.tasksState = this.tasksState.map((currentTask: TaskModel) => {
      const isTargetTask = currentTask.id === taskId;
      const buttonText = isTargetTask ? (currentTask.buttonText === 'play_arrow' ? 'pause' : 'play_arrow') : 'play_arrow';
      const isRunning = isTargetTask ? !currentTask.timer.isRunning : false;

      return { ...currentTask, buttonText, timer: { ...currentTask.timer, isRunning } };
    });

    this.emitNewTasksState();
  }

  private emitNewTasksState(): void {
    this.tasksStateSubject$.next(this.tasksState);
  }

  createTask(taskName: string): TaskModel {
    return {
      id: this.tasksState.length,
      buttonText: 'play_arrow',
      name: taskName,
      timer: this.getTimer()
    };
  }

  getTimer(): Timer {
    return { emitter$: new BehaviorSubject<number>(0), isRunning: false };
  }
}
