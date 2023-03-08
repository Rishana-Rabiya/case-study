import { Component } from '@angular/core';
import { APP_CONSTANT } from './app.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constants = APP_CONSTANT
}
