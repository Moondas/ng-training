import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    NavigationComponent
  ],
  providers: [
    ApiService,
    AuthService,
    AuthGuard
  ],
  declarations: [
    NotFoundComponent,
    NavigationComponent
  ]
})
export class SharedModule { }
