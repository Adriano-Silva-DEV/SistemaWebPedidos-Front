import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoResolve } from '../produto/services/produto.resolve';
import { BuscaComponent } from './busca/busca.component';
import { CarrinhoAppComponent } from './carrinho.app.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { DetalhesComponent } from './detalhes/detalhes.component';


const produtoRouterConfig: Routes = [
    {
        path: '', component: CarrinhoAppComponent,
        children: [
            { path: '', component: CarrinhoComponent,
            },
            { path: 'detalhes/:id', component: DetalhesComponent,            
                resolve: {produto: ProdutoResolve }     
            },
            { path: 'busca/:id', component: BuscaComponent,                   
        }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(produtoRouterConfig)
    ],
    exports: [RouterModule]
})
export class CarrinhoRoutingModule { }