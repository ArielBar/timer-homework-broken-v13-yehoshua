import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskTotalComponent } from './task-total.component';
import { MatCardModule } from '@angular/material/card';
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'minuteSecondsFormat' })
class MockPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}

describe('TaskContainerComponent', () => {
  let component: TaskTotalComponent;
  let fixture: ComponentFixture<TaskTotalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskTotalComponent, MockPipe],
      imports: [MatCardModule],
    });
    fixture = TestBed.createComponent(TaskTotalComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('DOM', () => {
    it('should render totalTime$', () => {
      component.totalTime = 20;
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(fixture.nativeElement).toMatchSnapshot();
      });
    });
  });
});
