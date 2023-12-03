import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

type ValidatorReturnType = { [key: string]: boolean } | null;

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskAddComponent implements OnInit {
  @Input() existingTasksNames: string[] = [];
  @Output() addTaskEvent = new EventEmitter<string>();
  taskAddForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.taskAddForm = this.formBuilder.group({
      taskName: new FormControl('', [
        Validators.required, Validators.minLength(2), this.validateNameTaken.bind(this)
      ])
    });
  }

  addTask(): void {
    const taskName = this.taskAddForm?.get('taskName').value.toLowerCase();
    this.addTaskEvent.emit(taskName);
    this.taskAddForm.reset();
  }

  validateNameTaken(control: AbstractControl): ValidatorReturnType {
    if(control.value === null) {
      return null;
    }

    const taskName = control.value.toLowerCase();
    return this.existingTasksNames.includes(taskName) ? { nameTaken: true } : null;
  }
}
