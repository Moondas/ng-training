import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserService } from './services/user.service';
import { UserRoutingModule } from './user-routing.module';
import { RegistrationComponent } from './components/registration/registration.component';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    UserRoutingModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
