import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';
import { MaterialModule } from '../modules/material/material.module';
import { ScatterplotComponent } from './scatterplot/scatterplot.component';



@NgModule({
  declarations: [
    DropdownComponent,
    ScatterplotComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    DropdownComponent,
    ScatterplotComponent
  ]
})
export class SharedModule { }
