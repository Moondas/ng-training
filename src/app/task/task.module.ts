import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatListModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { AgePipe } from './pipes/age.pipe';
import { TaskRoutingModule } from './task-routing.module';
import { TaskService } from './services/task.service';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskListItemComponent } from './components/task-list-item/task-list-item.component';
import { PropertyPipe } from './pipes/property.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TaskRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatFormFieldModule
  ],
  providers: [
    TaskService
  ],
  declarations: [
    TaskListComponent,
    TaskListItemComponent,
    AgePipe,
    PropertyPipe
  ]
})
export class TaskModule { }
