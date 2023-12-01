import { NgModule } from "@angular/core";
import { TaskTotalComponent } from "./task-total/task-total.component";
import { TaskPresenterComponent } from "./task-presenter/task-presenter.component";
import { TaskAddComponent } from "./task-add/task-add.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "@shared/shared.module";
import { TaskDashboardComponent } from "./task-dashboard.component";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    TaskTotalComponent,
    TaskPresenterComponent,
    TaskAddComponent,
    TaskDashboardComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [
    TaskDashboardComponent
  ]
})
export class TaskDashboardModule {
}
