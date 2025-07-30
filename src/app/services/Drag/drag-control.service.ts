import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DragControlService {

  

  private dragDisabled = new BehaviorSubject<boolean>(false);
  dragDisabled$ = this.dragDisabled.asObservable();

  setDragDisabled(value: boolean) {
    this.dragDisabled.next(value);
  }
}
