import { Component } from '@angular/core';
import { Fornecedor } from '../models/fornecedor';

import { ActivatedRoute } from '@angular/router';
import { FornecedorService } from '../services/fornecedor.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Produto } from 'src/app/produto/models/produto';
import { ProdutoService } from 'src/app/produto/services/produto.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  fornecedor: Fornecedor = new Fornecedor();
  produtos : Produto[];
  constructor(
    private route: ActivatedRoute,
    private fornecedorService: FornecedorService,
    private spinner: NgxSpinnerService,
    private produtoService: ProdutoService) {

      this.fornecedor = this.route.snapshot.data['fornecedor'];
      this.popularProdutos(this.fornecedor.id);
  }

  popularProdutos(id: string){
    this.spinner.show();
  this.produtoService.obterPorFornecedor(id).subscribe(
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
