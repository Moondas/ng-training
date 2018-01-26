import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  public tasks: Task[];
  public loading: boolean;

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
    this.loading = true;
    let observableBatch = [];

    this.tasks.forEach(
      element => {
        observableBatch.push(
          this._taskService.delete(element).subscribe(
            _ => this.removeTask(element)
          )            
      );
      }
    );

    forkJoin(observableBatch).subscribe(
      null,
      null,
      () => this.loading = false
    );
  }

}
