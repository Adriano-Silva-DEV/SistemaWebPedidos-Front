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
 produto: Produto;
 quantidade: number = 0;

constructor(){
 this.produto = new Produto();  
}
}