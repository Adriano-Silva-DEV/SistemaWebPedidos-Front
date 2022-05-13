import { Component, OnInit } from '@angular/core';
import { Carrinho, ItemCarrinho } from '../models/carrinho';
import { LocalStorageUtils } from '../../services/localstorage';
import { environment } from 'src/environments/environment';
import { utils } from 'protractor';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { StringUtils } from '../../utils/string-utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
})
export class CarrinhoComponent implements OnInit {
  imagens: string = environment.imgUrl;
  itensCarrinho: ItemCarrinho[];
  localStorage = new LocalStorageUtils();
  currencyUtils = new CurrencyUtils();
  totalPedido: any;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.popularTabela();
    this.processarPedido();
  }

  popularTabela() {
    let carrinho = this.localStorage.obterCarrinho();

    if (carrinho) {
      this.itensCarrinho = carrinho.itemCarrinho;
    }else{
      this.itensCarrinho = null;
    }

  }

  processarPedido() {
    let carrinho = this.localStorage.obterCarrinho();
    if (carrinho.itemCarrinho.length > 0) {
      this.totalPedido = carrinho.itemCarrinho
        .map((p) => {
          let total = p.quantidade * parseFloat(p.produto.precoVenda);
          return total;
        })
        .reduce(function (soma, i) {
          return soma + i;
        });
    }else{
      this.totalPedido = 0;
      this.router.navigate(['/home']);
    }

  }

  adicionarItem(id: string) {
    let carrinho = this.localStorage.obterCarrinho();
    if (carrinho) {
      let itemAdicionado = carrinho.itemCarrinho.find(
        (p) => p.produto.id == id
      );

      let itemTela = this.itensCarrinho.find(
        (p) => p.produto.id == id
      );

      if (itemAdicionado) {
        itemAdicionado.quantidade++;
        itemTela.quantidade++;
        this.localStorage.salvarCarrinho(carrinho);
        this.processarPedido();
      }
    }
    
  }

  subtrairItem(id: string) {
    let carrinho = this.localStorage.obterCarrinho();
    if (carrinho) {
      let itemAdicionado = carrinho.itemCarrinho.find(
        (p) => p.produto.id == id
      );

     let itemTela = this.itensCarrinho.find(
      (p) => p.produto.id == id
    );

      if (itemAdicionado) {
        if(itemAdicionado.quantidade > 1){        
           itemAdicionado.quantidade--;
           itemTela.quantidade--;
        }

        this.localStorage.salvarCarrinho(carrinho);
        this.processarPedido();
      }
    }
  }

  removerItem(id: string){
    let carrinho = this.localStorage.obterCarrinho();
    if (carrinho) {
      let itens = carrinho.itemCarrinho.filter(
        (p) => p.produto.id != id
      );
       carrinho.itemCarrinho = itens;
        this.localStorage.limparCarrinho();
        this.localStorage.salvarCarrinho(carrinho);
        this.processarPedido();
        this.popularTabela();
    }
  }
}
