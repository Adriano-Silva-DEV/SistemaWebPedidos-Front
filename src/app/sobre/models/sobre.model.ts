import { Endereco } from '../../conta/models/usuario';
export class Sobre {
      id: string;
      pessoaFisica : boolean;
      cnpj : string;
      razaoSocial : string;
      cpf : string;
      nomeEstabelecimento : string;
      horarioAbertura : string;
      horarioFechamento : string;
      descricao : string;
      contatoPrincipal : string;
      contatoSecundario : string;
      email : string;
     endereco : Endereco
}