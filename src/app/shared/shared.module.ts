import { NgModule } from "@angular/core";
import { MinuteSecondsFormatPipe } from "@shared/pipes/minute-seconds-format.pipe";
import { DestroyableComponent } from "@shared/components/destroyable.component";

@NgModule({
  declarations: [
    MinuteSecondsFormatPipe,
    DestroyableComponent
  ],
  exports: [
    MinuteSecondsFormatPipe,
    DestroyableComponent
  ]
})
export class SharedModule {
}
