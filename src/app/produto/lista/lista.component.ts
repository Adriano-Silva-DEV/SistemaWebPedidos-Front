import { Component, OnInit } from '@angular/core';
import { Produto } from '../models/produto';
import { ProdutoService } from '../services/produto.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuAdmComponent } from 'src/app/menu/menu-adm/menu-adm.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
   styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  public produtos: Produto[];
  errorMessage: string;

  imagens: string = environment.imgUrl;

  constructor(
    private produtoService: ProdutoService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();

    this.produtoService.obterTodos().subscribe(
      (produtos) => {
        this.produtos = produtos;
        this.spinner.hide();
      },
      (error) => {
        this.errorMessage;
        this.spinner.hide();
      }
    );
  }
}
