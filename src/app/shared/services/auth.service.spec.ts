import { environment } from './../../../environments/environment';
import { User } from './../../user/models/user';
import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let user: User;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [AuthService]
    });

    authService = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);

    user = new User();
    user.email = "test@example.com";
    user.password = "secret";
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should_login', done => {
    authService.login(user)
    .subscribe(
      response => {
        expect(response['user']).toEqual(
          {
            email: 'test@example.com',
            password: 'secret'
          }
        );
        
        expect(response['user']).toEqual({email: 'test@example.com', password: 'secret'}); 
        expect(response['token']).toBe('someToken');

        expect(localStorage.getItem('user')).toBe('{"email":"test@example.com","password":"secret"}'); 

        done();
      }
    );
    const loginRequest = httpMock.expectOne(environment.apiEndpoint + '/auth');
    loginRequest.flush({user: {email: 'test@example.com', password: 'secret'}, token: 'someToken'})
  });

  it('should_logout', () => {
    authService.user = user;
    authService.token = 'someToken'
    expect(localStorage.setItem('user', JSON.stringify({email: 'test@example.com', password: 'secret'})));
    expect(localStorage.setItem('token', 'someToken'));;

    authService.logout();
    expect(localStorage.getItem('user')).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
    expect(authService.user).toBeUndefined();
    expect(authService.token).toBeUndefined();
  });
});
