import { Carrinho } from '../carrinho/models/carrinho';
export class LocalStorageUtils {
    
    public obterUsuario() {
        return JSON.parse(localStorage.getItem('webpedidos.user'));
    }

    public salvarDadosLocaisUsuario(response: any) {
        this.salvarTokenUsuario(response.accessToken);
        this.salvarUsuario(response.userToken);
    }

    public limparDadosLocaisUsuario() {
        localStorage.removeItem('webpedidos.token');
        localStorage.removeItem('webpedidos.user');
    }

    public obterTokenUsuario(): string {
        return localStorage.getItem('webpedidos.token');
    }

    public salvarTokenUsuario(token: string) {
        localStorage.setItem('webpedidos.token', token);
    }

    public salvarUsuario(user: string) {
        localStorage.setItem('webpedidos.user', JSON.stringify(user));
    }


    /* pedidos */

    public salvarCarrinho(carrinho: Carrinho ) { 
        localStorage.setItem('webpedidos.carrinho', JSON.stringify(carrinho));
    }

    public obterCarrinho():Carrinho {
    let  produtos = localStorage.getItem('webpedidos.carrinho');
      return  JSON.parse(produtos);
    }

    public limparCarrinho() {
        localStorage.removeItem('webpedidos.carrinho');;
    }

}