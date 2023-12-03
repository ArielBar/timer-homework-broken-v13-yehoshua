import { TestBed } from '@angular/core/testing';
import { TasksService } from './tasks.service';
import { skip, take} from 'rxjs/operators';
import { TaskModel } from "@shared/models/task-model";
import { Timer } from "@shared/models/timer";
import { BehaviorSubject } from "rxjs";

const taskId = 0;
const baseMockTimer: Timer = { emitter$: new BehaviorSubject<number>(0), isRunning: false }
const baseMockTask: TaskModel = { id: taskId, buttonText: 'play_arrow', timer: baseMockTimer ,name: 'test1'};

describe('TasksService', () => {
  let tasksService: TasksService;

  beforeEach(() => {
    tasksService = TestBed.get(TasksService);
  });

  it('should load instance', () => {
    expect(tasksService).toBeTruthy();
  });

  it('should default initial state to: []', (done) => {
    expect.hasAssertions();

    tasksService.tasks$.pipe(take(1)).subscribe((tasks: TaskModel[]) => {
      expect(tasks.length).toEqual(0);
      done();
    });
  });

  it('should increase the state by one after adding a task', (done) => {
    expect.hasAssertions();
    jest.spyOn(tasksService, 'createTask').mockReturnValue(baseMockTask);

    tasksService.tasks$.pipe(skip(1)).subscribe((tasks: TaskModel[]) => {
      expect(tasks).toContainEqual(baseMockTask);
      expect(tasks.length).toEqual(1);
      done();
    });

    tasksService.addTask('');
  });


  describe('toggleTask', () => {
    it('should toggle pressed task', (done) => {
      jest.spyOn(tasksService, 'createTask').mockReturnValue(baseMockTask);
      tasksService.addTask('any task');
      tasksService.toggleTask(taskId);

      tasksService.tasks$.pipe(
        take(1)
      ).subscribe((tasks: TaskModel[]) => {
        const toggledTask = tasks[taskId];
        expect(toggledTask.buttonText).toEqual('pause');
        expect(toggledTask.timer.isRunning).toBe(true);
        done();
      })
    });

    // TODO
    // it('should stop all other tasks', (done) => {
    //   tasksService.addTask(baseMockTask.name);
    //
    //   tasksService.tasks$.pipe(
    //     take(1)
    //   ).subscribe((tasks: TaskModel[]) => {
    //     tasks.forEach((currentTask: TaskModel) => {
    //       if(currentTask.id !== taskId) {
    //         expect(currentTask.buttonText).toEqual('play_arrow');
    //         expect(currentTask.timer.isRunning).toBe(false);
    //       }
    //     })
    //
    //     done();
    //   });
    //
    //   tasksService.toggleTask(taskId);
    // });
  })

  // TODO
  // it('calculates total time correctly', (done) => {
  //   const firstTask = {...baseMockTask, name: 'firstTask', emitter$: new BehaviorSubject<number>(1)};
  //   const secondTask = {...baseMockTask, taskId: 1, name: 'secondTask', emitter$: new BehaviorSubject<number>(7)}
  //
  //
  //   jest.spyOn(tasksService, 'createTask').mockReturnValue(firstTask);
  //   tasksService.addTask('ant task');
  //   jest.spyOn(tasksService, 'createTask').mockReturnValue(secondTask);
  //   tasksService.addTask('ant task');
  //
  //   tasksService.totalTime$.pipe(
  //     take(1)
  //   ).subscribe(totalTime => {
  //     console.log(totalTime)
  //     expect(totalTime).toEqual(8);
  //     done()
  //   });
  // });
});
