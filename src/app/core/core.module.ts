import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@core/header/header.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '@core/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorsHandler } from '@core/services/error/errors-handler.service';
import { BackComponent } from './back/back.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [HeaderComponent, LoginComponent, BackComponent],
  exports: [HeaderComponent, LoginComponent, BackComponent],
  providers: [{
    provide: ErrorHandler,
    useClass: ErrorsHandler
  }]
})
export class CoreModule { }
