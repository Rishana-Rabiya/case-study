import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { APP_CONSTANT } from 'src/app/app.enum';
import { DropDown } from 'src/app/models/dropdown.model';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})

export class DropdownComponent {

  constructor() { }
 
  @Input() source: DropDown[] = [
   
  ];
  @Output() selectChange = new EventEmitter<DropDown>();

  @Input() label =''
  @Input() selected: any;
  
 
  selectionChange(evnt:any) {
    this.selected = evnt.value;
    this.selectChange.emit(this.selected)

  }


}
