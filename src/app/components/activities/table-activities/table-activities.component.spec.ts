import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableActivitiesComponent } from './table-activities.component';

describe('TableActivitiesComponent', () => {
  let component: TableActivitiesComponent;
  let fixture: ComponentFixture<TableActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableActivitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
