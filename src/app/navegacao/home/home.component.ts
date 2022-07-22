import { Component, Input, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/produto/services/produto.service';
import { Produto } from '../../produto/models/produto';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { Sobre } from 'src/app/sobre/models/sobre.model';
import { Pagination } from 'src/app/carrinho/models/pagination';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls:['./home.component.css']
})
export class HomeComponent {

  pagination: Pagination = new Pagination();
  paginaAtual:number;
  totalItensPorPagina:number = 15;

  
  produtos: Produto[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.paginaAtual = params['pagina'];
      this.buscarProdutos(this.paginaAtual)
  });
  }

  buscarProdutos(paginaAtual: number){
    
    let skip = paginaAtual == 1 || !paginaAtual  ? 0 : this.totalItensPorPagina * (paginaAtual - 1);

    this.spinner.show();
    this.produtoService.obterTodos(skip, this.totalItensPorPagina).subscribe(
      (produtos) => {
        produtos.forEach(p =>{
          if (p.quantidadeDisponivel < 1){
          const index = produtos.findIndex(element => element == p);
          produtos.push(produtos.splice(index, 1)[0]);
        }
        });

        this.produtos = produtos
        this.spinner.hide();

        if (this.produtos.length > 0)
        this.pagination = [...this.produtos].pop().pagination;
        this.spinner.hide();

      },
      (error) => {
       this.spinner.hide();
      }
    );
  }

  over(string : string){
      string = "Adicionar ao carrinho"
    console.log(string);
  }

}
