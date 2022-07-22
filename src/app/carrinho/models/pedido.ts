import { Carrinho, ItemCarrinho } from './carrinho';
import { Usuario, Endereco } from '../../conta/models/usuario';
import { meioPagamento } from './meio-pagamento';
import { Pagination } from './pagination';
export class Pedido {

id: string;

itensPedido:ItemCarrinho[]; 

usuarioId: string;

dataCriacao: Date;

enderecoEntrega: Endereco;

status: string;

meioPagamento: meioPagamento;

MeioPagamentoId: string;

troco: number;

quantidadeParcela: number;

numeroPedido: number;

valorTotal: number;

pagination: Pagination;
}