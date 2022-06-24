import { Component, OnInit } from '@angular/core';
import { LocalStorageUtils } from 'src/app/services/localstorage';
import { ItemCarrinho } from '../models/carrinho';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
 
  itensCarrinho: ItemCarrinho[];
  localStorage = new LocalStorageUtils();

  constructor() { }

  ngOnInit() {
    this.popularTabela();
  }


  popularTabela() {
    let carrinho = this.localStorage.obterCarrinho();

    if (carrinho) {
      this.itensCarrinho = carrinho.itemCarrinho;
    } else {
      this.itensCarrinho = null;
    }
  }

  totalItem(quantidade, valor) {
    return quantidade * valor;
  }
}
