import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceAutoCompileComponent } from './components/place-auto-compile/place-auto-compile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationComponent } from './directives/notification/notification.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  declarations: [PlaceAutoCompileComponent, NotificationComponent]
  , exports: [PlaceAutoCompileComponent, NotificationComponent]
})
export class SharedModule { }
