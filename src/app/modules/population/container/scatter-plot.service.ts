import { Injectable } from '@angular/core';
import { PopulationScatter } from 'src/app/models/population-scatter.model';
import * as d3 from 'd3';
import { APP_CONSTANT } from 'src/app/app.enum';
import { UtilService } from 'src/app/services/util.service';
@Injectable({
  providedIn: 'root'
})
export class ScatterPlotService {

  constructor(private util:UtilService) { }


  fetchData(callback: (data: PopulationScatter[],years:Array<any>,totalpop:string|number) => void, year: string) {
    d3.csv(
      "assets/data/population.csv"
    ).then((data) => {
      console.log("the changed year",year)
      let years = data.map(data => data['Year'])

      let yearFilteredData = data.filter(data => data['Year'] == year)
      let csvdata = yearFilteredData.map((data) => {
        let growthRate = data['Population_Growth_Rate']?.replace(/\s/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/,/g, "")
        if (growthRate == '-') {
          growthRate = '0'
        }
        let color = this.util.selectColor(Math.floor(Math.random() * 999), 10);

        let returndata = {
          population: Number(data['Population']?.replace(/\s/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/,/g, "")),
          populationGrowthRate: Number(growthRate),
          populationDensity: Number(data['Population_Density']?.replace(/\s/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/,/g, "")),
          color: color,
          country :data['Country']
        }
        
        if (returndata['populationDensity'] > 800) {
          returndata['populationDensity'] = 800
        }
        return returndata
      })
      let totalpop = 0;
      csvdata.forEach((value) => {
        totalpop= totalpop+value.population
      })
       callback(csvdata,Array.from(new Set(years)),this.util.convertToInternationalCurrencySystem(totalpop));
    }

    )
   
    

  }


  
}
