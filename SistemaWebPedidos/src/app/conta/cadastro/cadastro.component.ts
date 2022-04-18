import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { DadosUsuario, Endereco, Usuario } from '../models/usuario';
import { ContaService } from '../services/conta.service';
import { ValidationMessages, GenericValidator, DisplayMessage } from '../../utils/generic-form-validation';
import { CustomValidators } from 'ng2-validation';
import { fromEvent, merge, Observable } from 'rxjs';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit, AfterViewInit {
  
@ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];

  cadastroForm: FormGroup;
  dadosUsuario: DadosUsuario = new DadosUsuario();
  errors: any[] = [];

  validationMessages : ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};
  

  constructor(private fb: FormBuilder, private contaService : ContaService) {

    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      password: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
       // pattern: 'A senha deve possuir pelo menos uma letra maisculua e uma minuscula'
      },
      confirmpassword: {
        required: 'Informe a senha novamente',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
        equalTo: 'As senhas não conferem'
      },
      nome:{
        required: 'Informe o nome',
        rangeLength: 'A senha deve possuir entre 3 e 100 caracteres',
      },
      sobrenome:{
        required: 'Informe o sobrenome',
        rangeLength: 'A senha deve possuir entre 3 e 100 caracteres',
      },
      telefone:{
        required: 'Informe o telefone',
        rangeLength: 'A senha deve possuir entre 10 e 12 caracteres',
      },
      numero:{
        required: 'Informe o número',
        rangeLength: 'A senha deve possuir entre 1 e 5 caracteres',
      },
      bairro:{
        required: 'Informe o bairro',
        rangeLength: 'A senha deve possuir entre 2 e 100 caracteres',
      },
      rua:{
        required: 'Informe a rua',
        rangeLength: 'A senha deve possuir entre 1 e 100 caracteres',
      },
      cidade:{
        required: 'Informe a cidade',
        rangeLength: 'A senha deve possuir entre 2 e 100 caracteres',
      },
      estado:{
        required: 'Informe o estado',
        rangeLength: 'A senha deve possuir entre 2 e 100 caracteres',
      } 
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }
  
  
  ngOnInit(): void {

    let senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15]) ]);
    let senhaConfirm = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15]), CustomValidators.equalTo(senha)]);
    let nome = new FormControl('', [Validators.required, CustomValidators.rangeLength([3, 100]) ]);
    let sobrenome = new FormControl('', [Validators.required, CustomValidators.rangeLength([3, 100]) ]);
    let telefone = new FormControl('', [Validators.required, CustomValidators.rangeLength([10, 12]) ]);
    let numero = new FormControl('', [Validators.required, CustomValidators.rangeLength([1, 5]) ]);
    let rua = new FormControl('', [Validators.required, CustomValidators.rangeLength([2, 100]) ]);
    let bairro = new FormControl('', [Validators.required, CustomValidators.rangeLength([2, 100]) ]);
    let cidade = new FormControl('', [Validators.required, CustomValidators.rangeLength([2, 100]) ]);
    let estado = new FormControl('', [Validators.required, CustomValidators.rangeLength([2, 100]) ]);

    this.cadastroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: senha,
      confirmpassword: senhaConfirm,
      nome: nome,
      sobrenome: sobrenome,
      telefone: telefone,
        numero: numero,
        rua: rua,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
     });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

  merge(...controlBlurs).subscribe(() => {
    this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
  });
  console.log(this.cadastroForm.valid);
  }

  adicionarConta(){
    if(this.cadastroForm.dirty && this.cadastroForm.valid){
     // this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);
      this.dadosUsuario.email = this.cadastroForm.value.email;
      this.dadosUsuario.password = this.cadastroForm.value.password;
      this.dadosUsuario.confirmPassword = this.cadastroForm.value.confirmpassword;
    
      this.dadosUsuario.usuario.nome = this.cadastroForm.value.nome;
      this.dadosUsuario.usuario.sobrenome = this.cadastroForm.value.sobrenome;
      this.dadosUsuario.usuario.telefone = this.cadastroForm.value.telefone;
      
      this.dadosUsuario.usuario.endereco.numero =  this.cadastroForm.value.numero;
      this.dadosUsuario.usuario.endereco.rua =  this.cadastroForm.value.rua;
      this.dadosUsuario.usuario.endereco.cidade =  this.cadastroForm.value.cidade;
      this.dadosUsuario.usuario.endereco.estado =  this.cadastroForm.value.estado;
      this.dadosUsuario.usuario.endereco.bairro =  this.cadastroForm.value.bairro;

      this.contaService.cadastarUsuario(this.dadosUsuario)
      .subscribe(
        sucesso => { this.processarSucesso(sucesso)},
        falha => {this.processarFalha(falha)}
      );
    }

  }
  processarSucesso(response : any){

  }

  processarFalha(falha : any){
  this.errors = falha.error.errors;
  }
}
