
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

  
  
  @NgModule({
    exports: [
     
 
      MatToolbarModule,
      MatTooltipModule,
      MatSelectModule
    ]
  })
  export class MaterialModule { }