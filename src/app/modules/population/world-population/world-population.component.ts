import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { APP_CONSTANT } from 'src/app/app.enum';

@Component({
  selector: 'app-world-population',
  templateUrl: './world-population.component.html',
  styleUrls: ['./world-population.component.css'],
})
export class WorldPopulationComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}
  @Input() total: string = '0';
  @Input() year = '';
  unit = '';
  constants = APP_CONSTANT;
  ngOnInit(): void {}
  ngOnChanges() {
    console.log('splot', this.total.split(' ')[0]);
    let t = this.total.split(' ');
    this.unit = t[1] ? t[1] : '';
    this.total = t[0];
  }
}
