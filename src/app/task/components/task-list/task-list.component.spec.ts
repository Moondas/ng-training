import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { TaskListComponent } from './task-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { TaskService } from '../../services/task.service';
import { AgePipe } from './../../pipes/age.pipe';
import { TaskListItemComponent } from './../task-list-item/task-list-item.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, FormsModule, ReactiveFormsModule, HttpClientModule, SharedModule ],
      declarations: [ TaskListComponent, TaskListItemComponent, AgePipe ],
      providers: [ TaskService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
