export class DadosUsuario {
  id: string;
  email: string;
  password: string;
  passwordOld: string; 
  confirmPassword: string;
  usuario: Usuario = new Usuario();
};

export class Usuario {
  nome: string;
  sobrenome: string;
  telefone: string;
  endereco: Endereco = new Endereco();
};

export class Endereco {
    numero?: string;
    rua?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
};