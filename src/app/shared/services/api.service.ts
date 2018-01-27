import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class ApiService {

  constructor(
    private _http: HttpClient,
    private _authService: AuthService
  ) { }

  public request<T>(method: string, url: string, data?: any): Observable<T> {
    let observable = this._http.request<T>(
      method,
      environment.apiEndpoint + url,
      {
        body: data,
        headers: this._getHeaders()
      }
    );

    let subject = new Subject<T>();

    observable.subscribe(
      response => {
        subject.next(response);
       },
      errorResponse => {
        const tokenErrors = ['token_expired', 'token_invalid', 'token_not_provided'];
        if (tokenErrors.indexOf(errorResponse.error['error'])!== -1) {
          this._authService.logout();
        }

        subject.error(errorResponse);        
      }
    )
        
    return observable;
  }

  private _getHeaders() {
    let headers = {
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin' : '*'
    }

    if (this._authService.token) {
      headers['Authorization'] = 'Bearer ' + this._authService.token
    }

    return headers;
  }
}
