import { Component } from '@angular/core';
import { SobreService } from './sobre/services/sobre.Service';
import { Sobre } from './sobre/models/sobre.model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'SistemaWebPedidos';

  sobre: Sobre;
  constructor (  private router: Router, private sobreSerive: SobreService){

  }


 async ngOnInit(){
  this.router.events.subscribe((evt) => {
    if (!(evt instanceof NavigationEnd)) {
        return;
    }
    window.scrollTo(0, 0)
});

  this.sobre  = await this.sobreSerive.obter().toPromise();
  }

}
