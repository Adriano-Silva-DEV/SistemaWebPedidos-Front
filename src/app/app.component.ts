import { Component } from '@angular/core';
import { SobreService } from './sobre/services/sobre.Service';
import { Sobre } from './sobre/models/sobre.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'SistemaWebPedidos';

  sobre: Sobre;
  constructor (private sobreSerive: SobreService){
 
  }


 async ngOnInit(){
  this.sobre  = await this.sobreSerive.obter().toPromise();
  }

}
