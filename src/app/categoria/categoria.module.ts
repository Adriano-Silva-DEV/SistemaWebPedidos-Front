import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarComponent } from './listar/listar.component';
import { CategoriaAppComponent } from './categoria.app.component';
import { CategoriaRoutingModule } from './categoria.route';
import { CustomFormsModule } from 'ng2-validation';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NovoComponent } from './novo/novo.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { CategoriaService } from './services/categoriaService';
import { CategoriaResolve } from './services/fornecedor.resolve';
import { ProdutoModule } from '../produto/produto.module';
import { MenuModule } from '../menu/menu.module';



@NgModule({
  declarations: [
    ListarComponent,
    CategoriaAppComponent,
    NovoComponent,
    EditarComponent,
    ExcluirComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CategoriaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomFormsModule,
    NgxSpinnerModule,
    ProdutoModule,
    MenuModule
  ],
  providers: [
    CategoriaService,
    CategoriaResolve,
  ],
    schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class CategoriaModule { }
