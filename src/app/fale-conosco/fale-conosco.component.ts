import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Sobre } from '../sobre/models/sobre.model';
import { SobreService } from '../sobre/services/sobre.Service';

@Component({
  selector: 'app-fale-conosco',
  templateUrl: './fale-conosco.component.html',
  styleUrls: ['./fale-conosco.component.css']
})
export class FaleConoscoComponent implements OnInit {

  @Input()
  sobre: Sobre;

  @ViewChild("mensagem", {static: true})  
   mensagem: ElementRef; 

  constructor(private sobreService: SobreService ) { }

  async ngOnInit(){
    this.sobre  = await this.sobreService.obter().toPromise();
  }

  enviarMensagem(){
    window.open("https://api.whatsapp.com/send?phone=5565999222801&text="+this.mensagem.nativeElement.value); 
  }
}
