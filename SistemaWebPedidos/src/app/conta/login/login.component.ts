import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { DadosUsuario, Endereco, Usuario } from '../models/usuario';
import { ContaService } from '../services/conta.service';
import { ValidationMessages, GenericValidator, DisplayMessage } from '../../utils/generic-form-validation';
import { CustomValidators } from 'ng2-validation';
import { fromEvent, merge, Observable } from 'rxjs';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];

  loginForm: FormGroup;
  dadosUsuario: DadosUsuario = new DadosUsuario();
  errors: any[] = [];

  validationMessages : ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  mudancasNaoSalvas: boolean;

  constructor(private fb: FormBuilder, private contaService : ContaService,
    private router : Router, 
    private toastr: ToastrService) {

    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      password: {
        required: 'Informe a senha',
      }
    }
    this.genericValidator = new GenericValidator(this.validationMessages);
  }
  
  
  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [Validators.required]
     });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

  merge(...controlBlurs).subscribe(() => {
    this.displayMessage = this.genericValidator.processarMensagens(this.loginForm);
  });
  console.log(this.loginForm.valid);

  }

  login(){
    if(this.loginForm.dirty && this.loginForm.valid){
     // this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);
      this.dadosUsuario.email = this.loginForm.value.email;
      this.dadosUsuario.password = this.loginForm.value.password;
     

      this.contaService.login(this.dadosUsuario)
      .subscribe(
        sucesso => { this.processarSucesso(sucesso)},
        falha => {this.processarFalha(falha)}
      );
    }
  }

  processarSucesso(response : any){
    this.loginForm.reset();
    this.errors = [];
    this.contaService.localStorage.salvarDadosLocaisUsuario(response);
   
   let toast = this.toastr.success("Login efeturado com sucesso");

    if (toast){
      toast.onHidden.subscribe(  () =>
        this.router.navigate(['/home'])
      )
    }
  }

  processarFalha(falha : any){
  this.errors = falha.error.errors;
  this.toastr.error('Ocorreu um erro.', 'Ops!!' );
  }

}
