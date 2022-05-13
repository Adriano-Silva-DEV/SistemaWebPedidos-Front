import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Produto } from '../models/produto';
import { LocalStorageUtils } from 'src/app/services/localstorage';
import { ItemCarrinho } from 'src/app/carrinho/models/carrinho';
import { Carrinho } from '../../carrinho/models/carrinho';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card-produto',
  templateUrl: './card-produto.component.html',
  styleUrls: ['./card-produto.component.css'],
})
export class CardProdutoComponent implements OnInit {

  localStorage = new LocalStorageUtils();
  @Input()
  produtos: Produto[];
  imagens: string = environment.imgUrl;
  temp: boolean[] = [];
  temp_carrinho: boolean[] = [];
  quantidadeCArrinho: number;
  constructor(  private toastr: ToastrService) {}

  ngOnInit(): void {}

  adcionarCarrinho(produto: Produto) {
    let carrinho = this.localStorage.obterCarrinho();
   
    if (!carrinho) {
       carrinho = new Carrinho();
     
      this.localStorage.salvarCarrinho(carrinho);
      carrinho = this.localStorage.obterCarrinho();
    }
  
     let itemAdicionado = carrinho.itemCarrinho.find( p => p.produto.id == produto.id );
     let item : ItemCarrinho = new ItemCarrinho(); ;
    
     if (itemAdicionado){
         itemAdicionado.quantidade++; 
     }else{
      item.produto = produto;
      item.quantidade++;
      carrinho.itemCarrinho.push(item);
     }

    this.localStorage.salvarCarrinho(carrinho)

    this.quantidadeCArrinho = carrinho.itemCarrinho.length;
    this.toastr.success("Item adicionado ao carrinho")
  }
}
