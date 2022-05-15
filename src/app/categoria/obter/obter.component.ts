import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Produto } from 'src/app/produto/models/produto';
import { ProdutoService } from 'src/app/produto/services/produto.service';

@Component({
  selector: 'app-obter',
  templateUrl: './obter.component.html',
  styleUrls: ['./obter.component.css']
})
export class ObterComponent implements OnInit {
  produtos: Produto[] = new Array;
  id: string;
  params: any;
  constructor(   private produtoService: ProdutoService,
    private spinner: NgxSpinnerService,
     private route: Router, private activeRoute: ActivatedRoute  ) { 
      this.activeRoute.params.subscribe(params => this.id = params['id']);
      this.obterProdutos();
    }

  ngOnInit(): void {
   
    this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
       this.id = event.url.split("/",5)[4];
       this.obterProdutos();
      }
   })
  
  }

obterProdutos(){
  this.spinner.show();
  this.produtoService.obterPorCategoria(this.id).subscribe(
    (produtos) => {
      this.produtos = produtos;
      this.spinner.hide();
    },
    (error) => {
     this.spinner.hide();
    }
  );
}

}
