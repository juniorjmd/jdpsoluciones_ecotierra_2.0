import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  active = [true , false ];
  ngOnInit(): void {  
  }
  trueActive( id :number){ 
    this.active = [false , false ];
    
   this.active[id] = true;
  }

}
