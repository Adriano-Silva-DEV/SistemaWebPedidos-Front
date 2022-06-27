import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    CarrinhoComponent,
    CarrinhoAppComponent,
    DetalhesComponent,
    BuscaComponent,
    PedidoComponent,
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
    MatFormFieldModule
    
  ],
  providers:[
    PedidoComponent,
    MeioPagamentoService
  ]
})
export class CarrinhoModule {}
