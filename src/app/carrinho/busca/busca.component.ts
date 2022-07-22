import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Produto } from 'src/app/produto/models/produto';
import { ProdutoService } from 'src/app/produto/services/produto.service';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.css']
})
export class BuscaComponent implements OnInit {
  produtos: Produto[] = [];
  id: string;
  params: any;
  constructor(   private produtoService: ProdutoService,
    private spinner: NgxSpinnerService,
     private route: Router, private activeRoute: ActivatedRoute ) { 
      this.activeRoute.params.subscribe(params => this.id = params['id']);
      this.obter();
    }

  ngOnInit(): void {
   
    this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
      this.id = event.url.split("/",4)[3];
      this.obter();
      }
   })
  
  }

obter(){
  this.spinner.show();
  this.produtoService.busca(this.id).subscribe(
    (produtos) => {
      this.produtos = produtos;
      this.spinner.hide();
      console.log( this.produtos);
    },
    (error) => {
     this.spinner.hide();
    }
  );
}

}
