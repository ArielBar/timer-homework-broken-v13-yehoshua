import { BehaviorSubject } from "rxjs";

export interface Timer {
  emitter$: BehaviorSubject<number>;
  isRunning: boolean;
}
