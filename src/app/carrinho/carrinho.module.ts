import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { CarrinhoAppComponent } from './carrinho.app.component';
import { CarrinhoRoutingModule } from './carrinho.route';
import { MenuModule } from '../menu/menu.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ProdutoModule } from '../produto/produto.module';
import { BuscaComponent } from './busca/busca.component';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { PedidoComponent } from './pedido/pedido.component';
import { ContaModule } from '../conta/conta.module';
import { MeioPagamentoService } from './service/Forma-Pagamento.Service';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TextMaskModule } from 'angular2-text-mask';
import { PedidoService } from './service/pedido.service';
import { ContaGuard } from '../conta/services/conta.guard';
import { CarrinhoGuard } from './carrinho.guard';
import { PedidoUsuarioComponent } from './pedido-usuario/pedido-usuario.component';
import { PedidoUsuarioViewComponent } from './pedido-usuario-view/pedido-usuario-view.component';
import { PedidoResolve } from './service/pedido.resolve';
import { MenuUsuarioComponent } from '../menu/menu-usuario/menu-usuario.component';
import { GerenciaPedidoViewComponent } from './gerencia-pedido-view/gerencia-pedido-view.component';
import { ListaGerenciaPedidoComponent } from './lista-gerencia-pedido/lista-gerencia-pedido.component';
import { FornecedorResolve } from '../fornecedor/services/fornecedor.resolve';
import { FornecedorGuard } from '../fornecedor/services/fornecedor.guard';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PedidoAdmResolve } from './service/pedido-adm.resolve';

@NgModule({
  declarations: [
    CarrinhoComponent,
    CarrinhoAppComponent,
    DetalhesComponent,
    BuscaComponent,
    PedidoComponent,
    PedidoUsuarioComponent,
    PedidoUsuarioViewComponent,
    GerenciaPedidoViewComponent,
    ListaGerenciaPedidoComponent
  ],
  imports: [
    CommonModule,
    CarrinhoRoutingModule,
    MenuModule,
    MatSliderModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    ProdutoModule,
    MatRadioModule,
    FormsModule,
    ContaModule,
    MatExpansionModule,
    MatFormFieldModule,
    TextMaskModule,
    MenuModule,
    NgxSpinnerModule,

  ],
  providers:[
    PedidoComponent,
    MeioPagamentoService,
    PedidoService,
    { provide: LOCALE_ID, useValue: 'pt' },
    CarrinhoGuard,
    PedidoResolve,
    FornecedorGuard,
    PedidoAdmResolve,
  ]
})
export class CarrinhoModule {}
