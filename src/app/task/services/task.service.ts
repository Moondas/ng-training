import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './../../shared/services/api.service';
import { Task } from './../models/task';
import { environment } from './../../../environments/environment';
import { AuthService } from '../../shared/services/auth.service';

@Injectable()
export class TaskService extends ApiService {

  public list(): Observable<Task[]> {
    return this.request<Task[]>('GET', '/task');
  }

  public create(task: Task): Observable<Task> {
    return this.request('POST', '/task', task);
  }

  public update(task: Task): Observable<Task> {
    return this.request('PATCH', '/task/' + task.id, task);
  }
  
  public delete(task: Task): Observable<Task> {
    return this.request('DELETE', '/task/' + task.id, task);
  }
}
