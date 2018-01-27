import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable()
export class UserService {

  constructor(private _http: HttpClient) { }

  public register(user: User): Observable<Response> {
    return this._http.post<Response>(
      environment.apiEndpoint + '/user/register',
      user
    );
  }

}
