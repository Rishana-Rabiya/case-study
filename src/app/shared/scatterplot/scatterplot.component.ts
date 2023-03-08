import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import * as d3 from 'd3';
import { APP_CONSTANT } from 'src/app/app.enum';
import { PopulationScatter } from 'src/app/models/population-scatter.model';

@Component({
  selector: 'app-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.css'],
})
export class ScatterplotComponent implements OnInit {
  @Input() chartId = `scatterPlot`;
  @Input() margin = { top: 20, right: 30, bottom: 40, left: 60 };
  @Input() width = 1260 - this.margin.left - this.margin.right;
  @Input() height = 300 - this.margin.top - this.margin.bottom;

  private barWidth = 5;
  private svg: any;

  @Input() data: PopulationScatter[] = [];
  @Input() xKey = 'populationDensity';
  @Input() yKey = 'populationGrowthRate';

  @Input() xLabel = APP_CONSTANT.POPULATION_DENSITY;
  @Input() yLabel = APP_CONSTANT.POPULATION_GROWTH + '(%)';

  @Input() radiusKey = 'population';
  @Input() maxRadius = 45;
  @Input() average = { show: true, text: APP_CONSTANT.WORLD_AVG };

  private createSvg() {
    // create an svg element in the placeholder div
    let currentWidth = parseInt(
      d3.select(`#${this.chartId}`).style('width'),
      0
    );
    this.width = currentWidth;
    this.svg = d3
      .select(`#${this.chartId}`)
      .append('svg')
      .attr('width', this.width - 30)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')'
      );
  }

  private async drawChart() {
    let xDomain = d3.extent(this.data, (d: any) => d[this.xKey]);
    let yDomain = d3.extent(this.data, (d: any) => d[this.yKey]);
    let radiusDomain = d3.extent(this.data, (d: any) => d[this.radiusKey]);
    const x = d3
      .scaleLinear()
      .domain(xDomain ? xDomain : [0, 1000])
      .range([0, this.width]);
    const y = d3
      .scaleLinear()
      .domain(yDomain ? yDomain : [-100, 100])
      .range([this.height, 0]);

    // Add X axis

    const xAxis = this.svg
      .append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(x));
    // Y axis label:
    this.svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('transform', 'rotate(-90)')
      .attr('y', -this.margin.left + 15)
      .attr('x', -this.margin.top - 20)
      .style('font-size', `17px`)
      .text(this.yLabel);

    // Add X axis label:
    this.svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', this.width / 2)
      .attr('y', this.height + 30)
      .text(this.xLabel);
    // Add Y axis
    const yAxis = this.svg.append('g').call(d3.axisLeft(y));

    //ADD AVERAG
    if (this.average && this.average.show) {
      var dataSum = d3.sum(this.data, (d) => {
        return d.populationDensity;
      });
      this.svg
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('class', 'avg')

        .attr('x', x(dataSum / this.data.length))
        .attr('y', this.height + 30)
        .style('color', 'grey')
        .style('font-size', '12px')

        .text(
          this.average.text + ' ' + parseInt(dataSum / this.data.length + '')
        );
      this.svg
        .append('line')
        .attr('y1', 0)
        .attr('y2', this.height)
        .attr('x1', x(dataSum / this.data.length))
        .style('stroke-dasharray', '3, 3')
        .style('stroke', 'grey')
        .attr('x2', x(dataSum / this.data.length));
    }
    this.svg
      .append('line')
      .attr('x1', 3)
      .attr('x2', this.width)
      .attr('y1', y((yDomain[0] + yDomain[1]) / 2))
      .style('stroke-dasharray', '3, 3')
      .style('stroke', 'grey')
      .attr('y2', y((yDomain[0] + yDomain[1]) / 2));

    
    
    
    // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
    // Its opacity is set to 0: we don't see it by default.
    var tooltip = d3.select(`#tool`);

    // A function that change this tooltip when the user hover a point.
    // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
    var mouseover = function (d: any) {
      tooltip.style('opacity', 1);
    };

    const mousemove = function (event: any, d: any) {
      tooltip
        .html(`Country: ${d.country} <br/> Population : ${d.population}`)
        .style('position', 'absolute')
        .style('left', event.x / 2 + 'px') // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
        .style('top', event.y / 2 + 'px');
    };

    // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
    const mouseleave = function (event: any, d: any) {
      tooltip.transition().duration(200).style('opacity', 0);
    };

    // Add dots
    this.svg
      .append('g')
      .selectAll('circle')
      .data(this.data)
      .join('circle')
      .attr('cx', (d: any) => {
        return x(d[this.xKey]);
      })
      .attr('cy', (d: any) => {
        return y(d[this.yKey]);
      })
      .attr('r', (d: any) => {
        return (this.maxRadius / radiusDomain[1]) * d[this.radiusKey];
      })
      .style('fill', (d: any) => {
        return d.color;
      })
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave);
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    window.addEventListener('resize', this.chartInitialize);
  }

  ngOnChanges() {
    this.chartInitialize();
  }

  chartInitialize = () => {
    d3.selectAll(`#${this.chartId} > *`).remove();
    this.createSvg();
    this.cdr.detectChanges();
    this.drawChart();
  };
}
