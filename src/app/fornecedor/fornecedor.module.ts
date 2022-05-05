import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoComponent } from './novo/novo.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { FornecedorRoutingModule } from './fornecedor.route';
import { FornecedorAppComponent } from './fornecedor.app.component';
import { ListaComponent } from './lista/lista.component';
import { FornecedorService } from './services/fornecedor.service';

import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { HttpClientModule } from '@angular/common/http';
import { NgBrazil } from 'ng-brazil' 
import { TextMaskModule } from 'angular2-text-mask';
import { FornecedorResolve } from './services/fornecedor.resolve';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FornecedorGuard } from './services/fornecedor.guard';
import { ProdutoModule } from '../produto/produto.module';
import { MenuModule } from '../menu/menu.module';

@NgModule({
  declarations: [
    FornecedorAppComponent,
    NovoComponent,
    ListaComponent,
    EditarComponent,
    ExcluirComponent,
    DetalhesComponent,
  ],
  imports: [
    CommonModule,
    FornecedorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgBrazil,
    TextMaskModule,
    NgxSpinnerModule,
    ProdutoModule,
    MenuModule
  ],
  providers: [
    FornecedorService,
    FornecedorResolve,
    FornecedorGuard
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class FornecedorModule { }
