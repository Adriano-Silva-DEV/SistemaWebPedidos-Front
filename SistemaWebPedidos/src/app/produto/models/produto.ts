import { Categoria } from "src/app/categoria/models/categoria";
import { Fornecedor } from "src/app/fornecedor/models/fornecedor";

export class Produto {
  id: string;
  nome: string;
  categoria: Categoria;
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
}
