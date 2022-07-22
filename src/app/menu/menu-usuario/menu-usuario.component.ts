import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.css']
})
export class MenuUsuarioComponent implements OnInit {
 
  @Input()
  menuActive : string;
  constructor() { }

  ngOnInit() {
  }

}
