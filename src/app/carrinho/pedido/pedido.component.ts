import { Component, OnInit } from '@angular/core';
import { LocalStorageUtils } from 'src/app/services/localstorage';
import { ItemCarrinho } from '../models/carrinho';
import { ContaService } from '../../conta/services/conta.service';
import { Endereco } from '../../fornecedor/models/endereco';
import { meioPagamento } from '../models/meio-pagamento';
import { MeioPagamentoService } from '../service/Forma-Pagamento.Service';
import { Router } from '@angular/router';
import { number } from 'ng-brazil/number/validator';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
 
  itensCarrinho: ItemCarrinho[];
  localStorage = new LocalStorageUtils();
  enderecoCliente: Endereco;
  meiosPagamento: meioPagamento[] = this.meioPagamentoService.meiosPagamento;
  meioPagamento;
  totalPedido: any;
  panelOpenState = false;

  constructor(private router: Router, private contaService : ContaService, private meioPagamentoService:  MeioPagamentoService ) { }

  ngOnInit() {
    this.popularTabela();
    this.buscarEndrecoCliente();
    this.processarPedido();
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

  async buscarEndrecoCliente(){
    this.contaService.obterEnderecoCliente().subscribe(
     (res) => {
      this.enderecoCliente = res;
      }
    )
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
    } else {
      this.totalPedido = 0;
      this.router.navigate(['/home']);
    }
  }

  calcularParcelamento(valor, meio) {
    return this.meioPagamentoService.calcularParcelamento(valor, meio);
   }

   returnArray(valor : number){
    return new Array(valor);
   }
}
