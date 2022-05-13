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

@NgModule({
  declarations: [CarrinhoComponent, CarrinhoAppComponent, DetalhesComponent],
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
    ProdutoModule
  ],
})
export class CarrinhoModule {}
