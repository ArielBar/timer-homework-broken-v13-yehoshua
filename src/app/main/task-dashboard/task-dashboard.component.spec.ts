import { Component, Input } from "@angular/core";
import { TaskModel } from "@shared/models/task-model";
import { of } from "rxjs";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MinuteSecondsFormatPipe } from "@shared/pipes/minute-seconds-format.pipe";
import { MatCardModule } from "@angular/material/card";
import { TaskDashboardComponent } from "../task-dashboard/task-dashboard.component";
import { TasksService } from "@shared/services/tasks.service";

@Component({
  selector: 'app-task-presenter',
  template: ` <p>{{ task | json }}</p> `,
})
class FakeComponent {
  @Input() task: TaskModel;
}

class TasksServiceMock {
  get tasks$() {
    return of([]);
  }
  get totalTime$() {
    return of(1);
  }
  updateTask() {
    return {};
  }
}

describe('TaskDashboardComponent', () => {
  let component: TaskDashboardComponent;
  let fixture: ComponentFixture<TaskDashboardComponent>;
  let tasksService: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FakeComponent, MinuteSecondsFormatPipe, TaskDashboardComponent],
      providers: [{ provide: TasksService, useClass: TasksServiceMock }],
      imports: [MatCardModule],
    });
    fixture = TestBed.createComponent(TaskDashboardComponent);
    component = fixture.componentInstance;
    tasksService = TestBed.inject(TasksService);
  });

  it('should load instance', () => {
    expect(component).toBeTruthy();
  });

  // TODO
  // it('should render tasks$', () => {
  //   const tasks: TaskModel[] = [
  //     { id: 1, name: 'test1', buttonText: 'pause', timer: {emitter$: new BehaviorSubject<number>(0), isRunning: false} },
  //     { id: 2, name: 'test2', buttonText: 'pause', timer: {emitter$: new BehaviorSubject<number>(0), isRunning: false} },
  //     { id: 3, name: 'test3', buttonText: 'pause', timer: {emitter$: new BehaviorSubject<number>(0), isRunning: false} },
  //   ];
  //
  //   jest.spyOn(tasksService, 'tasks$', 'get').mockReturnValue(of(tasks));
  //   fixture.detectChanges();
  //
  //   fixture.whenStable().then(() => {
  //     expect(fixture.nativeElement).toMatchSnapshot();
  //   });
  // });

  // TODO:
  // Test:
  // runTaskTimers(),  addTask(), toggleTask(), ngOnInit() and DOM
})
