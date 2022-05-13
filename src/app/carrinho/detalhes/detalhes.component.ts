import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageUtils } from 'src/app/services/localstorage';
import { environment } from 'src/environments/environment';
import { Produto } from '../../produto/models/produto';
import { Carrinho, ItemCarrinho } from '../models/carrinho';

@Component({
  selector: 'app-carrinho-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {
  localStorage = new LocalStorageUtils();
  temp: boolean[] = [];
  temp_carrinho: boolean[] = [];
  quantidadeCArrinho: number;
  
  @Input()
  produto : Produto;
  imagens: string = environment.imgUrl;
  constructor(private route: ActivatedRoute,
    private toastr: ToastrService ) {
    this.produto = this.route.snapshot.data['produto'];
   }

  ngOnInit(): void {
  }


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
