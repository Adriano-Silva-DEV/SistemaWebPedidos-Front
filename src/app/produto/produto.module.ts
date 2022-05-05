import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from "ngx-spinner";

import { ProdutoRoutingModule } from './produto.route';
import { ProdutoAppComponent } from './produto.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ProdutoService } from './services/produto.service';
import { ProdutoResolve } from './services/produto.resolve';
import { ProdutoGuard } from './services/produto.guard';
import { ImageCropperModule} from 'ngx-image-cropper';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MenuModule } from '../menu/menu.module';


@NgModule({
  declarations: [
    ProdutoAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    ExcluirComponent,
    DetalhesComponent,
    ListaProdutosComponent
  ],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    NgBrazil,
    TextMaskModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ImageCropperModule,
    MenuModule
  ],
  providers: [
    ProdutoService,
    ProdutoResolve,
    ProdutoGuard
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports:[ ListaProdutosComponent]
})
export class ProdutoModule { }