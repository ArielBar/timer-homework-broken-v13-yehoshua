import { NgModule } from "@angular/core";
import { MinuteSecondsPipe } from "@shared/pipes/minute-seconds.pipe";

@NgModule({
  declarations: [
    MinuteSecondsPipe
  ],
  exports: [
    MinuteSecondsPipe
  ]
})
export class SharedModule {
}
