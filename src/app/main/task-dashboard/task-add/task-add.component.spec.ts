import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, AbstractControl, FormBuilder } from '@angular/forms';
import { TaskAddComponent } from './task-add.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

describe('TaskAddComponent', () => {
  let component: TaskAddComponent;
  let fixture: ComponentFixture<TaskAddComponent>;
  let control: AbstractControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskAddComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
    });
    fixture = TestBed.createComponent(TaskAddComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    control = component.taskAddForm.get('taskName');
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('validateNameTaken', () => {
    it('should return null when taskName is null', () => {
      control.setValue(null);

      const result = component.validateNameTaken(control);

      expect(result).toBeNull();
    });

    it('should return null when task name is not taken', () => {
      component.existingTasksNames = ['oldTask'];
      control.setValue('newTask');

      const result = component.validateNameTaken(control);

      expect(result).toBeNull();
    });

    // TODO
    // it('should return true when task name is taken', () => {
    //   component.existingTasksNames = ['existingTask'];
    //   control.setValue('existingTask');
    //
    //   const result = component.validateNameTaken(control);
    //
    //   expect(result).toEqual({ nameTaken: true });
    // });
  });

  describe('ngOnInit', () => {
    it('should make expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(FormBuilder);
      jest.spyOn(formBuilderStub, 'group');
      component.ngOnInit();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });

  describe('addTask', () => {
    it('should emit addTaskEvent', () => {
      const addTaskEventSpy = jest.spyOn(component.addTaskEvent, 'emit');

      control.setValue('newTask');
      component.addTask();

      expect(addTaskEventSpy).toHaveBeenCalledTimes(1);
      expect(addTaskEventSpy).toHaveBeenCalledWith('newtask');
    });
  });
});
