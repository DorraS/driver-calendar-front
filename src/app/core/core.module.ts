import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@core/header/header.component';
import { FooterComponent } from '@core/footer/footer.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '@core/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [HeaderComponent, FooterComponent, LoginComponent, HomeComponent],
  exports: [HeaderComponent, FooterComponent, LoginComponent]
})
export class CoreModule { }
