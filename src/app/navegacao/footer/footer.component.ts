import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriaService } from 'src/app/categoria/services/categoriaService';
import { Sobre } from '../../sobre/models/sobre.model';
import { CategoriaModel } from 'src/app/categoria/models/categoria';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  categorias: CategoriaModel[];
  @Input()
  sobre: Sobre;
  imagens: string = environment.imgUrl;
  constructor(
    private categoriaService: CategoriaService,
    private spinner: NgxSpinnerService
  ) {}

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
