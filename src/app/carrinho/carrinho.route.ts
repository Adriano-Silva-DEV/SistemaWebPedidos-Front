import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContaGuard } from '../conta/services/conta.guard';
import { FornecedorGuard } from '../fornecedor/services/fornecedor.guard';
import { ProdutoResolve } from '../produto/services/produto.resolve';
import { BuscaComponent } from './busca/busca.component';
import { CarrinhoAppComponent } from './carrinho.app.component';
import { CarrinhoGuard } from './carrinho.guard';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { PedidoUsuarioViewComponent } from './pedido-usuario-view/pedido-usuario-view.component';
import { PedidoUsuarioComponent } from './pedido-usuario/pedido-usuario.component';
import { PedidoComponent } from './pedido/pedido.component';
import { PedidoResolve } from './service/pedido.resolve';
import { ListaGerenciaPedidoComponent } from './lista-gerencia-pedido/lista-gerencia-pedido.component';
import { GerenciaPedidoViewComponent } from './gerencia-pedido-view/gerencia-pedido-view.component';
import { PedidoAdmResolve } from './service/pedido-adm.resolve';

const produtoRouterConfig: Routes = [
  {
    path: '',
    component: CarrinhoAppComponent,
    children: [
      { path: '', component: CarrinhoComponent },
      {
        path: 'detalhes/:id',
        component: DetalhesComponent,
        resolve: { produto: ProdutoResolve },
      },
      { path: 'busca/:id', component: BuscaComponent },
      {
        path: 'pedido',
        component: PedidoComponent,
        canActivate: [CarrinhoGuard],
      },
      {
        path: 'meus-pedidos',
        component: PedidoUsuarioComponent,
        canActivate: [CarrinhoGuard],
      },
      {
        path: 'pedido-visualizar/:id',
        component: PedidoUsuarioViewComponent,
        canActivate: [CarrinhoGuard],
        resolve: { pedido: PedidoResolve },
      },
      {
        path: 'gerenciar-pedidos',
        component: ListaGerenciaPedidoComponent,
        canActivate: [FornecedorGuard],
        data: [{ claim: { nome: 'Fornecedor', valor: 'Atualizar'}}],
      },
      {
        path: 'gerenciar-pedido-visualizar/:id',
        component: GerenciaPedidoViewComponent,
        canActivate: [FornecedorGuard],
        resolve: { pedido: PedidoAdmResolve },
        data: [{ claim: { nome: 'Fornecedor', valor: 'Atualizar'}}]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(produtoRouterConfig)],
  exports: [RouterModule],
})
export class CarrinhoRoutingModule {}
