import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, merge, Observable } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { DadosUsuario, Endereco } from '../models/usuario';
import { ContaService } from '../services/conta.service';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {

    
@ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];

  cadastroForm: FormGroup;
  dadosUsuario: DadosUsuario = new DadosUsuario();
  errors: any[] = [];
  enderecoCliente :Endereco = new Endereco();
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

  async ngOnInit() {

   await this.obterEnderecoCliente();

    let numero = new FormControl('', [Validators.required, CustomValidators.rangeLength([1, 5]) ]);
    let rua = new FormControl('', [Validators.required, CustomValidators.rangeLength([2, 100]) ]);
    let bairro = new FormControl('', [Validators.required, CustomValidators.rangeLength([2, 100]) ]);
    let cidade = new FormControl('', [Validators.required, CustomValidators.rangeLength([2, 100]) ]);
    let estado = new FormControl('', [Validators.required, CustomValidators.rangeLength([2, 100]) ]);

    this.cadastroForm = this.fb.group({
        numero: numero,
        rua: rua,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
     });

 this.popularForm();
  }

   popularForm(){
    this.cadastroForm.patchValue({
   numero: this.enderecoCliente.numero,
   rua: this.enderecoCliente.rua,
   bairro: this.enderecoCliente.bairro,
   cidade: this.enderecoCliente.cidade,
   estado: this.enderecoCliente.estado
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

  merge(...controlBlurs).subscribe(() => {
    this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
  });

  this.mudancasNaoSalvas = true;

}

adicionarConta(){
  if(this.cadastroForm.dirty && this.cadastroForm.valid){   
    this.enderecoCliente.numero =  this.cadastroForm.value.numero;
    this.enderecoCliente.rua =  this.cadastroForm.value.rua;
    this.enderecoCliente.cidade =  this.cadastroForm.value.cidade;
    this.enderecoCliente.estado =  this.cadastroForm.value.estado;
    this.enderecoCliente.bairro =  this.cadastroForm.value.bairro;

    this.contaService.editarEnderecoCliente(this.enderecoCliente)
    .subscribe(
      sucesso => { this.processarSucesso(sucesso)},
      falha => {this.processarFalha(falha)}
    );
  }
 this.mudancasNaoSalvas = false;
}


processarSucesso(response : any){
  this.enderecoCliente = response;
  this.popularForm();
  this.errors = [];
 let toast = this.toastr.success("Editado com sucesso");

}

processarFalha(falha : any){
this.errors = falha.error.errors;
this.toastr.error('Ocorreu um erro.', 'Ops!!' );
}


 async obterEnderecoCliente(){
    this.enderecoCliente = await this.contaService.obterEnderecoCliente().toPromise();

  }
}
