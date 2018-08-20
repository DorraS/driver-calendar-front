import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceAutoCompileComponent } from './components/place-auto-compile/place-auto-compile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  declarations: [PlaceAutoCompileComponent]
  , exports: [PlaceAutoCompileComponent]
})
export class SharedModule { }
