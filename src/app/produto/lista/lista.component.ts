import { Component, OnInit } from '@angular/core';
import { Produto } from '../models/produto';
import { ProdutoService } from '../services/produto.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuAdmComponent } from 'src/app/menu/menu-adm/menu-adm.component';
import { Pagination } from 'src/app/carrinho/models/pagination';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
   styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  public produtos: Produto[];
  errorMessage: string;

  imagens: string = environment.imgUrl;

  pagination: Pagination = new Pagination();
  paginaAtual:number;
  totalItensPorPagina:number = 10;
  
  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
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
        this.produtos = produtos;
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

}
