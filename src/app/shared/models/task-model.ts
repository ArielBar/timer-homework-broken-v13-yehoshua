import { ButtonText } from './button-text';
import { Timer } from "@shared/models/timer";

export interface TaskModel {
  id: number;
  name: string;
  timer: Timer;
  buttonText: ButtonText;
}
