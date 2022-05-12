import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/produto/services/produto.service';
import { Produto } from '../../produto/models/produto';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls:['./home.component.css']
})
export class HomeComponent {
  produtos: Produto[];
  imagens: string = environment.imgUrl;
  constructor(
    private produtoService: ProdutoService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
   this.spinner.show();
    this.produtoService.obterTodos().subscribe(
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
