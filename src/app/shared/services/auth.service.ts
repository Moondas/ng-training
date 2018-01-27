import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { User } from './../../user/models/user';
import { AppComponent } from './../../app.component';
import { environment } from './../../../environments/environment';

@Injectable()
export class AuthService {

  public user: User;
  public token: string;

  public constructor(
    private _http: HttpClient,
    private _router: Router
  ) {
    this._loadFromStorage();
   }

  public login(user: User): Observable<any> {
    let observable = this._http.post(
      environment.apiEndpoint + '/auth',
      user,
      {
        headers: {
          'Access-Control-Allow-Origin' : '*'
        }
      }
    );

    let subject = new Subject();

    observable.subscribe(
      response => {
        this.user = response['user'];
        this.token = response['token'];

        this._saveToStorage();

        subject.next(response);
      },
      errorResponse => {
        subject.error(errorResponse);
      }
    )

    return subject;
  }

  public logout() {
    this.user = undefined;
    this.token = undefined;
    this._saveToStorage();
    this._router.navigate(['/home']);
  }

  private _saveToStorage(): void {
    if (this.token) {
      localStorage.setItem('token', this.token);
    } else {
      localStorage.removeItem('token');
    }
    if (this.user) {
      localStorage.setItem('user', JSON.stringify(this.user));
    } else {
      localStorage.removeItem('user');
    }
  }

  private _loadFromStorage() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.token = localStorage.getItem('token');
  }
}
