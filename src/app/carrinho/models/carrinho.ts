import { Produto } from '../../produto/models/produto';



export class Carrinho {
 itemCarrinho: ItemCarrinho[];   
 data: Date;

 constructor(){
     this.data = new Date();
     this.itemCarrinho = new Array;
 }
}

export class ItemCarrinho{
 id?: string;   
 produto?: Produto;
 produtoId?: string;
 quantidade?: number = 0;
 valorTotal?: number;

constructor(){
 this.produto = new Produto();  
}
}