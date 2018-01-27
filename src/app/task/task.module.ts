import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TaskListItemComponent } from './components/task-list-item/task-list-item.component';
import { TaskRoutingModule } from './task-routing.module';
import { TaskService } from './services/task.service';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AgePipe } from './pipes/age.pipe';

@NgModule({
  imports: [
    CommonModule,
    TaskRoutingModule,
    FormsModule
  ],
  declarations: [TaskListComponent, TaskListItemComponent, AgePipe],
  providers: [
    TaskService
  ]
})
export class TaskModule { }
