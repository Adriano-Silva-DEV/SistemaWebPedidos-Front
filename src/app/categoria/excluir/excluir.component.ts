import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoriaModel } from '../models/categoria';
import { CategoriaService } from '../services/categoriaService';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  styleUrls: ['./excluir.component.css']
})
export class ExcluirComponent implements OnInit {

  categoria: CategoriaModel = new CategoriaModel();
  errors: any[] = [];
  constructor(
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) {
      toastr.toastrConfig.progressBar=true;
      toastr.toastrConfig.timeOut = 1000;

      this.categoria = this.route.snapshot.data['categoria'];
      
  }
  ngOnInit(): void {
  }

  excluirEvento() {
    this.categoriaService.excluirCategoria(this.categoria.id)
      .subscribe(
        evento => { this.sucessoExclusao(evento) },
        error => { this.falha(error) }
      );
  }

  sucessoExclusao(evento: any) {

    const toast = this.toastr.success('categoria excluido com Sucesso!', 'Sucesso');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/adm/categoria/listar-todos']);
      });
    }
  }

  falha(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('Houve um erro!', 'Ops!');
  }
}
