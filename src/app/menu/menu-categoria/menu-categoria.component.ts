import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../produto/services/produto.service';
import { CategoriaService } from '../../categoria/services/categoriaService';
import { CategoriaModel } from 'src/app/categoria/models/categoria';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-menu-categoria',
  templateUrl: './menu-categoria.component.html',
  styleUrls: ['./menu-categoria.component.css']
})
export class MenuCategoriaComponent implements OnInit {

  categorias: CategoriaModel[];
  public isCollapsed: boolean;
  constructor(private ProdutoService: ProdutoService, private categoriaService: CategoriaService, private spinner: NgxSpinnerService) { 
    this.isCollapsed = true;
  }

  ngOnInit(): void {

    this.spinner.show();

    this.categoriaService.obterTodos().subscribe(
      (categorias) => {
        this.categorias = categorias;
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }
}
