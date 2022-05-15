import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContaGuard } from '../conta/services/conta.guard';
import { ProdutoGuard } from '../produto/services/produto.guard';
import { CategoriaAppComponent } from './categoria.app.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { ListarComponent } from './listar/listar.component';
import { NovoComponent } from './novo/novo.component';
import { ObterComponent } from './obter/obter.component';
import { CategoriaResolve } from './services/fornecedor.resolve';

const contaRouterConfig: Routes = [
  {
    path: '',
    component: CategoriaAppComponent,
    children: [
      {
        path: 'obter/:id',
        component: ObterComponent,
      },
       {
        path: 'novo',
        component: NovoComponent,
        canActivate: [ProdutoGuard],
        canDeactivate: [ProdutoGuard],
      },
      {
        path: 'listar-todos',
        component: ListarComponent,
        canActivate: [ProdutoGuard],
      },
      {
        path: 'editar/:id',
        component: EditarComponent,
        canActivate: [ProdutoGuard],
        resolve: {
          categoria: CategoriaResolve,
        },
      },
      {
        path: 'excluir/:id',
        component: ExcluirComponent,
        canActivate: [ProdutoGuard],
        resolve: {
          categoria: CategoriaResolve,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(contaRouterConfig)],
  exports: [RouterModule],
})
export class CategoriaRoutingModule {}
