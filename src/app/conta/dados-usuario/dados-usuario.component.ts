import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, merge, Observable } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { DadosUsuario } from '../models/usuario';
import { ContaService } from '../services/conta.service';

@Component({
  selector: 'app-dados-usuario',
  templateUrl: './dados-usuario.component.html',
  styleUrls: ['./dados-usuario.component.css']
})
export class DadosUsuarioComponent implements OnInit {
  
  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];

  cadastroForm: FormGroup;
  dadosUsuario: DadosUsuario = new DadosUsuario();
  errors: any[] = [];

  validationMessages : ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  mudancasNaoSalvas: boolean;

  constructor(private fb: FormBuilder, private contaService : ContaService,
    private router : Router, 
    private toastr: ToastrService) {
      toastr.toastrConfig.progressBar=true;
      toastr.toastrConfig.timeOut = 1000;
   
      this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      passwordOld: {
        required: 'Informe a senha antiga',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
       // pattern: 'A senha deve possuir pelo menos uma letra maisculua e uma minuscula'
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
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }
  

  ngOnInit() {
    this.buscarInformacoesUsuario();

    let senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15]) ]);
    let senhaOld = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15]) ]);
    let senhaConfirm = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15]), CustomValidators.equalTo(senha)]);
    let nome = new FormControl('', [Validators.required, CustomValidators.rangeLength([3, 100]) ]);
    let sobrenome = new FormControl('', [Validators.required, CustomValidators.rangeLength([3, 100]) ]);
    let telefone = new FormControl('', [Validators.required, CustomValidators.rangeLength([10, 12]) ]);
  
    this.cadastroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: senha,
      passwordOld: senhaOld,
      confirmpassword: senhaConfirm,
      nome: nome,
      sobrenome: sobrenome,
      telefone: telefone
     });
  }

  
  preencherForm() {

    this.cadastroForm.patchValue({
  email: this.dadosUsuario.email,
  nome: this.dadosUsuario.usuario.nome,
  sobrenome: this.dadosUsuario.usuario.sobrenome,
  telefone: this.dadosUsuario.usuario.telefone
    });
  }


  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

  merge(...controlBlurs).subscribe(() => {
    this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
  });
  console.log(this.cadastroForm.valid);

  this.mudancasNaoSalvas = true;
  }

  adicionarConta(){
    if(this.cadastroForm.dirty && this.cadastroForm.valid){
     // this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);
      this.dadosUsuario.email = this.cadastroForm.value.email;
      this.dadosUsuario.password = this.cadastroForm.value.password;
      this.dadosUsuario.passwordOld = this.cadastroForm.value.passwordOld;
      this.dadosUsuario.confirmPassword = this.cadastroForm.value.confirmpassword;
    
      this.dadosUsuario.usuario.nome = this.cadastroForm.value.nome;
      this.dadosUsuario.usuario.sobrenome = this.cadastroForm.value.sobrenome;
      this.dadosUsuario.usuario.telefone = this.cadastroForm.value.telefone;
      
      this.contaService.alterarUsuario(this.dadosUsuario)
      .subscribe(
        sucesso => { this.processarSucesso(sucesso)},
        falha => {this.processarFalha(falha)}
      );
    }
   this.mudancasNaoSalvas = false;
  }
  processarSucesso(response : any){
    this.cadastroForm.reset();
    this.errors = [];
    this.contaService.localStorage.salvarDadosLocaisUsuario(response);
   
   let toast = this.toastr.success("Alterado com sucesso");

  }

  processarFalha(falha : any){
  this.errors = falha.error.errors;
  this.toastr.error('Ocorreu um erro.', 'Ops!!' );
  }


  buscarInformacoesUsuario(){
    this.contaService.dadosUsuario()
      .subscribe(
        sucesso => { this.dadosUsuario = sucesso;
          this.preencherForm()},
        falha => {this.processarFalha(falha)}
      );
  }
}
