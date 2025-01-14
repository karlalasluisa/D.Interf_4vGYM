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

  private activitybuttonSource = new BehaviorSubject<string | null>(null);
  activityButton$ = this.activitybuttonSource.asObservable();

  setButton(button: string) {
    this.activitybuttonSource.next(button);
    alert(button);
  }

  clearButton() {
    this.activitybuttonSource.next(null);
  }

}
