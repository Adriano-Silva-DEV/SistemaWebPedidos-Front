import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FornecedorGuard } from '../fornecedor/services/fornecedor.guard';
import { EditarComponent } from './editar/editar.component';
import { SobreAppComponent } from './fornecedor.app.component';
import { SobreResolve } from './services/sobre.resolve';


const SobreRouterConfig: Routes = [
  {
    path: '',
    component: SobreAppComponent,
    children: [
      {
        path: 'info',
        component: EditarComponent, 
        canActivate: [FornecedorGuard],
        data: [{ claim: { nome: 'Fornecedor', valor: 'Atualizar'}}], 
        resolve: {
          sobre: SobreResolve
        },     
      }
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(SobreRouterConfig)],
  exports: [RouterModule],
})
export class SobreRoutingModule {}
