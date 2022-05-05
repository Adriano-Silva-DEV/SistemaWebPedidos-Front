import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriaModel } from '../models/categoria';
import { CategoriaService } from '../services/categoriaService';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  categorias : CategoriaModel[];
  errorMessage: Promise<unknown>;

  constructor(private categoriaService: CategoriaService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();

    this.categoriaService.obterTodos().subscribe(
      (categorias) => {
        this.categorias = categorias;
        this.spinner.hide();
      },
      (error) => {
        this.errorMessage, this.spinner.hide();
      }
    );
  }

  
}
