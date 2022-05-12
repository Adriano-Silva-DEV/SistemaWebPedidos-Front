import { Component, Input, OnInit } from '@angular/core';
import { Sobre } from '../../sobre/models/sobre.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {

  @Input()
  sobre: Sobre;

  ngOnInit(): void {
 console.log(this.sobre);
    
  }
}
