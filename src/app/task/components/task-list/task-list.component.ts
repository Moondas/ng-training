import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';


import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { Observable, Subscribable } from 'rxjs/Observable';

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

  public loadTasks() {
    this.loading = true;
    this._taskService.list().subscribe(
      tasks => {
        this.tasks = tasks;
        this.loading = false;
        this.hasDeletable = this.tasks.length > 0;
      }
    );
  }

  public addNewTask() {
    this.loading = true;
    const task = new Task();
    task.name = 'New Task';
    this._taskService.create(task).subscribe(
      () => this.loadTasks(),
      () => this.loadTasks()
    );
  }

  public removeTask(task: Task) {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  public deleteAll() {
    if (!window.confirm('Are you sure, you want to delete all tasks?')) {
       return;
      }
    this.loading = true;
    // Delete from behind
    for (let i = this.tasks.length-1; i >= 0; i--) {
      let task: Task = this.tasks[i];

      this._taskService.delete(task)
        .subscribe(
          _ => {
            this.removeTask(task);
             (this.tasks.length > 0) || this.loadTasks();
             
          },
          e => {
            console.log(e);
            this.loadTasks();
          }
        )
    }

  }
  
}
