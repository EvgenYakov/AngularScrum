import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBoardPageComponent } from './task-board-page.component';

describe('TaskBoardPageComponent', () => {
  let component: TaskBoardPageComponent;
  let fixture: ComponentFixture<TaskBoardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskBoardPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskBoardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
