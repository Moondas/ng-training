import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private _http: HttpClient) { }

  public register(user: User): Observable<any> {
    return this._http.post(
      environment.apiEndpoint + '/user/register', 
    user
  );
  }

}
