import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../services/produto.service';

import { ToastrService } from 'ngx-toastr';

import { Produto } from '../models/produto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  styleUrls: ['./excluir.component.css']
})
export class ExcluirComponent  {

  produto: Produto;
  imagens: string = environment.imgUrl;
  constructor(private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {
      toastr.toastrConfig.progressBar=true;
      toastr.toastrConfig.timeOut = 1000;

    this.produto = this.route.snapshot.data['produto'];
  }

  excluirProduto() {
    this.produtoService.excluirProduto(this.produto.id)
      .subscribe(
      sucesso => { this.sucessoExclusao() },
      falha  => { this.falha() }
      );
  }

   sucessoExclusao() {

    let toast = this.toastr.success('Produto excluido com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/produtos/listar-todos']);
      });
    }
  }

  falha() {
    this.toastr.error('Houve um erro', 'Ops!');
  }
}

