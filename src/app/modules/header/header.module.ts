import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    MainHeaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MainHeaderComponent
  ]
})
export class HeaderModule { }
