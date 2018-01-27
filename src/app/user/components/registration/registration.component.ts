import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public user: User = new User();
  public form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
  },  
  RegistrationComponent.passwordMatchValidator
  
);

  constructor(private _userService: UserService) { }

  ngOnInit() {

  }

  public register() {
    this._userService.register(this.user).subscribe(
      response => {
        console.log(response);
        window.alert('Succesful registration');
        
        this.user = new User();
        this.form.reset();
      },
      error => {
        console.log(error);
        window.alert('Registration failed!');
      }
    );
  }

  public static passwordMatchValidator(form: FormGroup) {
    return form.get("password").value == form.get("passwordConfirm").value ? null : {mismatch: true}
  }
}
