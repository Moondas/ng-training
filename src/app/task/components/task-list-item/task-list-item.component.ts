import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { TaskService } from './../../services/task.service';
import { Task } from './../../models/task';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.css']
})
export class TaskListItemComponent implements OnInit {

  public loading: boolean;
  public now: number;
  private  _timekeeper: number;

  @Input() public task: Task;
  @Output() public taskChange = new EventEmitter<Task>();
  @Input() public disabled: boolean;
  @Output() public error: EventEmitter<any> = new EventEmitter();
  @Output() public delete = new EventEmitter<Task>();

  constructor(private _taskService: TaskService) { }

  ngOnInit() {
    this.now = this._getUtcTime();
    this._timekeeper = window.setInterval(() => {
      this.now = this._getUtcTime();
    }, 1000);
  }

  public ngOnDestroy() {
    window.clearInterval(this._timekeeper);
  }

   private _getUtcTime() {
    return Date.now() + (new Date()).getTimezoneOffset() * 60 * 1000;
  }

  public updateTask() {
    this.loading = true;    
    this._taskService.update(this.task).subscribe(
      updatedTask => {
        this.task = updatedTask;
        this.taskChange.emit(this.task);
        this.loading = false        
      },
      error => this.error.next(error)    
    );
  }

  public deleteTask(task: Task) {
    if (!window.confirm(`Are you sure to delete "${task.name}"?`)) {
      return;
    }
    this.loading = true;
    this._taskService.delete(task).subscribe(
      _ => {
        this.delete.emit(task);
        this.loading = false;
      },
      error => {
        this.error.emit();
        this.loading = false;
      }
    );
  }
}
