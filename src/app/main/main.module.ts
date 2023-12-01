import { NgModule } from "@angular/core";
import { TaskDashboardModule } from "./task-dashboard/task-dashboard.module";

@NgModule({
  imports: [
    TaskDashboardModule
  ],
  exports: [
    TaskDashboardModule
  ]
})
export class MainModule {
}
