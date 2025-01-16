import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorSimpleComponent } from './monitor-simple.component';

describe('MonitorSimpleComponent', () => {
  let component: MonitorSimpleComponent;
  let fixture: ComponentFixture<MonitorSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitorSimpleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitorSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
