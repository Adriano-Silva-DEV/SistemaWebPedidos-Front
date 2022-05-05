import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { Produto } from '../models/produto';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit {
  errorMessage: string;

  imagens: string = environment.imgUrl;

  constructor(
    private produtoService: ProdutoService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
   
  }

  @Input()
  produtos: Produto[];
  
}
