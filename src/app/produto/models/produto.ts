import { CategoriaModel } from "src/app/categoria/models/categoria";
import { Fornecedor } from "src/app/fornecedor/models/fornecedor";
import { Pagination } from '../../carrinho/models/pagination';

export class Produto {
  id: string;
  nome: string;
  categoria: CategoriaModel;
  categoriaId: string;
  descricao: string;
  precoCusto: string;
  precoVenda: string;
  precoPromocional: string;
  imagem1: string;
  imagem2: string;
  imagem3: string;
  imagem4: string;
  imagem5: string;
  sku: string;
  url: string;
  ativo: boolean;
  fornecedor?:  Fornecedor;
  fornecedorId: string;
  dataCadastro: string;
  dataCriacao: Date;
  imagemUpload: string;
  pagination: Pagination;
  quantidadeDisponivel: number;
}
