import { Endereco } from '../../conta/models/usuario';
export class Sobre {
      id: string;
      pessoaFisica : boolean;
      cnpj : string;
      razaoSocial : string;
      cpf : string;
      nomeEstabelecimento : string;
      horarioAbertura : string = "08:00";
      horarioFechamento : string = "18:00";
      descricao : string;
      contatoPrincipal : string;
      contatoSecundario : string;
      email : string;
      numero: string;
      rua: string;
      bairro: string;
      cidade: string;
      estado: string;
}