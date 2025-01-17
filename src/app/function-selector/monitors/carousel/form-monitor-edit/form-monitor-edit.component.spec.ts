import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMonitorEditComponent } from './form-monitor-edit.component';

describe('FormMonitorEditComponent', () => {
  let component: FormMonitorEditComponent;
  let fixture: ComponentFixture<FormMonitorEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMonitorEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormMonitorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
