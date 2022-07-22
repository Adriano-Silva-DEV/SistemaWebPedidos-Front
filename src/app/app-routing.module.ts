import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './navegacao/home/home.component';
import { NotFoundComponent } from './navegacao/not-found/not-found.component';
import { FaleConoscoComponent } from './fale-conosco/fale-conosco.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'conta',
    loadChildren: () =>
      import('./conta/conta.module').then((m) => m.ContaModule),
  },
  {
    path: 'adm/fornecedores',
    loadChildren: () => import('./fornecedor/fornecedor.module')
      .then(m => m.FornecedorModule)
  },
  {
    path: 'adm/produtos',
    loadChildren: () => import('./produto/produto.module')
      .then(m => m.ProdutoModule)
  },
  {
    path: 'adm/categoria',
    loadChildren: () => import('./categoria/categoria.module')
      .then(m => m.CategoriaModule)
  },
  {
    path: 'adm/sobre',
    loadChildren: () => import('./sobre/sobre.module')
      .then(m => m.SobreModule)
  },
  {
    path: 'page',
    loadChildren: () => import('./carrinho/carrinho.module')
      .then(m => m.CarrinhoModule)
  },
  {
    path: 'fale-conosco',
    loadChildren: () => import('./fale-conosco/fale-conosco.module')
      .then(m => m.FaleConoscoModule)
  },
  { path: 'nao-encontado', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
