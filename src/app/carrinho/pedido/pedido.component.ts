import { Component, OnInit } from '@angular/core';
import { LocalStorageUtils } from 'src/app/services/localstorage';
import { ItemCarrinho } from '../models/carrinho';
import { ContaService } from '../../conta/services/conta.service';
import { meioPagamento } from '../models/meio-pagamento';
import { MeioPagamentoService } from '../service/Forma-Pagamento.Service';
import { Router } from '@angular/router';
import { number } from 'ng-brazil/number/validator';
import { utilsBr } from 'js-brasil';
import { Toast, ToastrService } from 'ngx-toastr';
import { Pedido } from '../models/pedido';
import { PedidoService } from '../service/pedido.service';
import { Endereco } from 'src/app/conta/models/usuario';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
})
export class PedidoComponent implements OnInit {
  itensCarrinho: ItemCarrinho[];
  localStorage = new LocalStorageUtils();
  enderecoCliente: Endereco;
  meiosPagamento: meioPagamento[];
  meioPagamento;
  totalPedido: number;
  panelOpenState = false;
  formaPagamento: any;
  quantidadeParcela: number;
  troco: any;
  MASKS = utilsBr.MASKS;
  pedido: Pedido = new Pedido();
  imagens: string = environment.imgUrl;
  processando: boolean;
  constructor(
    private router: Router,
    private contaService: ContaService,
    private meioPagamentoService: MeioPagamentoService,
    private toastr: ToastrService,
    private pedidoService: PedidoService,
    private spinner: NgxSpinnerService,
  ) {
    toastr.toastrConfig.progressBar = true;
    toastr.toastrConfig.timeOut = 4000;
    toastr.toastrConfig.positionClass = 'toast-bottom-center';
  }

  ngOnInit() {
    this.popularTabela();
    this.buscarEndrecoCliente();
    this.processarPedido();
    this.enderecoCliente = new Endereco();
    this.obterMeiosPagamento();
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

  async buscarEndrecoCliente() {
    this.contaService.obterEnderecoCliente().subscribe(
      sucesso => {
      this.enderecoCliente = sucesso;
    },
    falha => {
      if (falha.status == 401 || falha.status == 402 || falha.status == 403  ){
      let toast =  this.toastr.info("Faça login para finalizar seu pedido");
      if (toast){
        this.contaService.localStorage.limparDadosLocaisUsuario();
        this.router.navigate(['/conta/login'])
      }
    }}
    );
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

  returnArray(valor: number) {
    return new Array(valor);
  }

  pegarFormaPagamento(tipo) {
    this.meioPagamento = tipo;
    this.quantidadeParcela = null;
    this.troco = null;
  }

  finalizarpedido() {
    if (this.meioPagamento == null || this.quantidadeParcela == null){
      this.toastr.info('Selecione a forma de pagamento');
    } else {
      this.spinner.show();
      this.processando = true;

      this.pedido.itensPedido = [];
      this.pedido.MeioPagamentoId = this.meioPagamento.id;
      this.pedido.quantidadeParcela = this.quantidadeParcela;
      this.pedido.troco = this.trocoF();


       this.itensCarrinho.forEach( item => {

        let itensCarrinho : ItemCarrinho = {
            produtoId: item.produto.id,
             quantidade: item.quantidade
        }

        this.pedido.itensPedido.push(itensCarrinho);
      });



    this.pedidoService.processar(this.pedido).subscribe(
      sucesso => {  this.localStorage.limparCarrinho();
        this.spinner.hide();
        let toast =  this.toastr.success("Pedido de nº "+sucesso.numeroPedido+" gerado com sucesso");
        if (toast){
          toast.onHidden.subscribe(  () =>
            this.router.navigate(['/home'])
          )
        }
      },
      falha => {
        this.spinner.hide();
         this.toastr.error('Ocorreu um erro na solicitação')
                 if (falha.status == 401 || falha.status == 402 || falha.status == 403  ){
                   this.contaService.localStorage.limparDadosLocaisUsuario();
                  this.router.navigate(['/conta/login'])
                 }
    }
    );
    }
  }
  trocoF() {
    if (this.troco != null)
      return parseFloat(this.troco.slice(2).replace('.', '').replace(',', '.'));

    return parseFloat(this.troco);
  }

  async obterMeiosPagamento() {
    this.meiosPagamento = await this.meioPagamentoService.obterTodos().toPromise();
  }
}
