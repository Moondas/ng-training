import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/mapTo';
import { merge } from 'rxjs/observable/merge';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';

import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  public tasks: Task[];
  public loading: boolean;
  public hasDeletable: boolean;

  public constructor(private _taskService: TaskService) {
    //
  }

  public ngOnInit() {
    this.loadTasks();
  }

  public setHasDeletable() {
    this.hasDeletable = this.tasks.filter(task => task.is_done).length > 0;
  }

  public loadTasks() {
    this.loading = true;
    this._taskService.list().subscribe(
      tasks => {
        this.tasks = tasks;
        this.loading = false;
        this.setHasDeletable();
      }
    );
  }

  public addNewTask() {
    this.loading = true;
    const task = new Task();
    task.name = 'New Task';
    this._taskService.create(task).subscribe(
      () => this.loadTasks(),
      error => {
        console.log(error);
        this.loadTasks();
      }
    );
  }

  public removeTask(task: Task) {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  public deleteCompleted() {
    if (!window.confirm('Are you sure, you want to delete all tasks?')) {
       return;
      }
      
    let observableBatch: Array<any> = [];
    
    observableBatch = this.tasks.filter(
      task => 
        task.is_done ? this._taskService.delete(task).mapTo(task) : null
    );
    
    if (observableBatch.length) {
      this.loading = true;
      merge(observableBatch).subscribe(
        task => this.removeTask(task),
        error => {
          console.log("Error: ", error);
          this.loadTasks();
        },
        () => {
          this.loading = false;
          this.setHasDeletable();
        }
      );
    }       
  }  
}