import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-adm',
  templateUrl: './menu-adm.component.html',
  styleUrls: ['./menu-adm.component.css']
})
export class MenuAdmComponent implements OnInit {
  
  @Input()
  menuActive : string; 

  constructor() { }

  ngOnInit(): void {
  
  }

}
