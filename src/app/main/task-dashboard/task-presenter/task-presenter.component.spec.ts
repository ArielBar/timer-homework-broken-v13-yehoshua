import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TaskPresenterComponent } from './task-presenter.component';
import { Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Pipe({ name: 'minuteSecondsFormat' })
class MockPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}

describe('TaskPresenterComponent', () => {
  let component: TaskPresenterComponent;
  let fixture: ComponentFixture<TaskPresenterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TaskPresenterComponent, MockPipe],
      imports: [MatIconModule, MatCardModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskPresenterComponent);
    component = fixture.componentInstance;

    component.task = {
      id: 1,
      name: 'some name',
      buttonText: 'pause',
      timer: { emitter$: new BehaviorSubject<number>(0), isRunning: false }
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render task', () => {
    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('should toggle task', () => {
    const toggleTaskEventSpy = jest.spyOn(component.toggleTaskEvent, 'emit');

    component.toggleTask();

    expect(toggleTaskEventSpy).toHaveBeenCalledTimes(1);
    expect(toggleTaskEventSpy).toHaveBeenCalledWith(1);
  });
});
