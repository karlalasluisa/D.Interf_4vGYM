import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class WindowServiceService {

  private display = new Subject<boolean>();
  display$ = this.display.asObservable();

  show() {
    this.display.next(true);
  }

  hide() {
    this.display.next(false);
  }

  private activityIdSource = new BehaviorSubject<number | null>(null);
  activityId$ = this.activityIdSource.asObservable();

  setActivityId(id: number) {
    this.activityIdSource.next(id);
  }

  clearActivityId() {
    this.activityIdSource.next(null);
  }

}
