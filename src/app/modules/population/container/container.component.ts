import { Component, Input, OnInit } from '@angular/core';
import { APP_CONSTANT } from 'src/app/app.enum';
import { DropDown } from 'src/app/models/dropdown.model';
import { PopulationScatter } from 'src/app/models/population-scatter.model';
import { ScatterPlotService } from './scatter-plot.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})

export class ContainerComponent implements OnInit {

  constructor(private scatterService : ScatterPlotService) { }

  selectedYear = { 'value': '1950', 'viewValue': APP_CONSTANT.YEAR + ' : ' + '1950' };
  years: any;
  scatterData: PopulationScatter[] = [];
  constants = APP_CONSTANT;
  totalPop: string ='0'
  
  ngOnInit(): void {
   this.fetchData()
    
  }
  onYearChange(year: any) {
    this.selectedYear = year;
    this.fetchData();
  }

  fetchData() {
    this.scatterService.fetchData((data, years, totalPop) => {
      this.scatterData = data;
      this.totalPop = totalPop +'';
      if(!this.years)
      this.years = years.map(data=>{  return { 'value': data, 'viewValue': APP_CONSTANT.YEAR + ' : ' + data } });
    },this.selectedYear.value)
  }

}
