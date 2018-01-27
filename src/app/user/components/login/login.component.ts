import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from './../../models/user';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loading: boolean = true;
  public user: User = new User();
  public form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  }  
);
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.loading = false;
  }

  public login() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this._authService.login(this.user).subscribe(
      response => {
        console.log(response);
        window.alert('Succesful login!');
        
        this.user = new User();
        this.form.reset();
        this._router.navigate(['/home']);
      },
      error => {
        console.log(error);
        window.alert('Login failed!');
        this.loading = false;
      }
    )
  }
}
