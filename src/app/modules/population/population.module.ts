import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { WorldPopulationComponent } from './world-population/world-population.component';



@NgModule({
  declarations: [
    ContainerComponent,
    WorldPopulationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[ContainerComponent]
})
export class PopulationModule { }
