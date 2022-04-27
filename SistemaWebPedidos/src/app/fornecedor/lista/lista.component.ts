import { Component, OnInit } from '@angular/core';
import { FornecedorService } from '../services/fornecedor.service';
import { Fornecedor } from '../models/fornecedor';
import { NgxSpinnerService } from 'ngx-spinner';
import { utilsBr } from 'js-brasil';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
})
export class ListaComponent implements OnInit {
  public fornecedores: Fornecedor[];
  errorMessage: string;

  MASKS = utilsBr.MASKS;

  constructor(
    private fornecedorService: FornecedorService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();

    this.fornecedorService.obterTodos().subscribe(
      (fornecedores) => {
        this.fornecedores = fornecedores;
        this.spinner.hide();
      },
      (error) => {
        this.errorMessage, this.spinner.hide();
      }
    );
  }
}
