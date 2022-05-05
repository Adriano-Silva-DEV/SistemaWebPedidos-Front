import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControlName,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import {
  ValidationMessages,
  GenericValidator,
  DisplayMessage,
} from 'src/app/utils/generic-form-validation';
import { Fornecedor } from '../models/fornecedor';
import { FornecedorService } from '../services/fornecedor.service';
import { NgBrazilValidators } from 'ng-brazil';
import { utilsBr } from 'js-brasil';
import { StringUtils } from '../../utils/string-utils';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
})
export class NovoComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  errors: any[] = [];
  fornecedorForm: FormGroup;
  fornecedor: Fornecedor = new Fornecedor();

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};
  textoDocumento: string = 'CPF (requerido)'
  formResult: string = '';

  mudancasNaoSalvas: boolean;

  MASK = utilsBr.MASKS;

  constructor(
    private fb: FormBuilder,
    private fornecedorService: FornecedorService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.validationMessages = {
      nome: {
        required: 'Informe o Nome',        
      },
      documento: {
        required: 'Informe o Documento',
        cpf: 'Cpf em formato inválido',
        cnpj: 'Cnpj em formato inválido'
      },
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {
    this.fornecedorForm = this.fb.group({
      nome: ['', [Validators.required]],
      documento: ['', [Validators.required, NgBrazilValidators.cpf]],
      ativo: ['', [Validators.required]],
      tipoFornecedor: ['', [Validators.required]],
    });

    this.fornecedorForm.patchValue({ tipoFornecedor: '1', ativo: true });
  }

  ngAfterViewInit(): void {
   this.configurarElementosValidacao();

   this.tipoFornecedorForm().valueChanges.subscribe(
     () => {
       this.trocarValidacaoDocumento();
       this.configurarElementosValidacao();
       this.validarFormulario;
     }
   )
  }

  configurarElementosValidacao(){
    let controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );
    merge(...controlBlurs).subscribe(() => {
      this.validarFormulario();
    });
  }

  trocarValidacaoDocumento()
  {
    if(this.tipoFornecedorForm().value === "1"){
       this.documentoForm().clearValidators();
       this.documentoForm().setValidators([Validators.required, NgBrazilValidators.cpf]);
       this.textoDocumento = "Cpf (requerido)"
    }else{
      this.documentoForm().clearValidators();
      this.documentoForm().setValidators([Validators.required, NgBrazilValidators.cnpj]);
      this.textoDocumento = "Cnpj (requerido)"
    }
  }

  validarFormulario(){
    this.displayMessage = this.genericValidator.processarMensagens(this.fornecedorForm);
    this.mudancasNaoSalvas= true;
  }

  tipoFornecedorForm( ):AbstractControl{
   return this.fornecedorForm.get('tipoFornecedor');
  }

  documentoForm( ):AbstractControl{
    return this.fornecedorForm.get('documento');
   }

  adicionarFornecedor() {
    if (this.fornecedorForm.dirty && this.fornecedorForm.valid) {
      this.fornecedor = Object.assign(
        {},
        this.fornecedor,
        this.fornecedorForm.value
      );

      this.fornecedor.documento = StringUtils.somenteNumeros(this.fornecedor.documento);

      this.formResult = JSON.stringify(this.fornecedor);

      this.fornecedorService.novoFornecedor(this.fornecedor).subscribe(
        (sucesso) => {
          this.processarSucesso(sucesso);
        },
        (falha) => {
          this.processarFalha(falha);
        }
      );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.fornecedorForm.reset();
    this.errors = [];

    let toast = this.toastr.success(
      'Fornecedor cadastrado com sucesso!',
      'Sucesso!'
    );
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/fornecedores/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Ops');
  }
}
