import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { utilsBr } from 'js-brasil';
import { NgBrazilValidators } from 'ng-brazil';
import { CustomValidators } from 'ng2-validation';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, merge, Observable } from 'rxjs';
import {
  DisplayMessage,
  GenericValidator,
  ValidationMessages,
} from 'src/app/utils/generic-form-validation';
import { StringUtils } from 'src/app/utils/string-utils';
import { Sobre } from '../models/sobre.model';
import { SobreService } from '../services/sobre.Service';
import { Endereco } from '../../conta/models/usuario';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
})
export class EditarComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  sobre: Sobre;
  textoDocumento: string = '';
  errors: any[] = [];
  sobreForm: FormGroup;

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  MASKS = utilsBr.MASKS;
  formResult: string = '';

  mudancasNaoSalvas: boolean;

  constructor(
    private fb: FormBuilder,
    private sobreService: SobreService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.validationMessages = {
      nomeEstabelecimento: {
        required: 'Informe o nome do estabelecimento',
        rangeLength: 'o nome deve possuir entre 3 e 100 caracteres',
      },

      descricao: {
        required: 'Informe o e-mail',
        email: 'Email inválido',
      },
      razaoSocial: {
        required: 'Informe o e-mail',
        rangeLength: 'a razao social deve possuir entre 3 e 100 caracteres',
      },

      contatoPrincipal: {
        required: 'Informe o telefone',
        rangeLength: 'A senha deve possuir entre 10 e 12 caracteres',
      },
      documento: {
        required: 'Informe o e-mail',
        email: 'Email inválido',
      },

      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido',
      },

      horarioAbertura: {
        required: 'Informe o telefone',
        rangeLength: '',
      },

      horarioFechamento: {
        required: 'Informe o telefone',
        rangeLength: '',
      },

      numero: {
        required: 'Informe o número',
        rangeLength: 'O numero deve possuir entre 1 e 5 caracteres',
      },
      bairro: {
        required: 'Informe o bairro',
        rangeLength: 'O bairro deve possuir entre 2 e 100 caracteres',
      },
      rua: {
        required: 'Informe a rua',
        rangeLength: 'A rua deve possuir entre 1 e 100 caracteres',
      },
      cidade: {
        required: 'Informe a cidade',
        rangeLength: 'A cidade deve possuir entre 2 e 100 caracteres',
      },
      estado: {
        required: 'Informe o estado',
        rangeLength: 'O estado deve possuir entre 2 e 100 caracteres',
      },
    };

    this.genericValidator = new GenericValidator(this.validationMessages);

    this.sobre = this.route.snapshot.data['sobre'];
  }

  ngOnInit(): void {
    let numero = new FormControl('', [
      Validators.required,
      CustomValidators.rangeLength([1, 5]),
    ]);
    let rua = new FormControl('', [
      Validators.required,
      CustomValidators.rangeLength([2, 100]),
    ]);
    let bairro = new FormControl('', [
      Validators.required,
      CustomValidators.rangeLength([2, 100]),
    ]);
    let cidade = new FormControl('', [
      Validators.required,
      CustomValidators.rangeLength([2, 100]),
    ]);
    let estado = new FormControl('', [
      Validators.required,
      CustomValidators.rangeLength([2, 100]),
    ]);

    this.sobreForm = this.fb.group({
      nomeEstabelecimento: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(200),
        ],
      ],
      descricao: ['', [Validators.required]],
      razaoSocial: ['', [Validators.minLength(2), Validators.maxLength(200)]],
      contatoPrincipal: ['', [Validators.required]],
      documento: ['', [Validators.required]],

      // horarioAbertura: ['', [Validators.required]],
      //horarioFechamento: ['', [Validators.required]],

      //contatoSecundario: [''],
      email: ['', [Validators.required]],
      numero: numero,
      rua: rua,
      bairro: bairro,
      cidade: cidade,
      estado: estado,
      tipoDocumento: ['', [Validators.required]],
    });

    this.preencherForm();
  }

  preencherForm() {
    this.sobreForm.patchValue({
      pessoaFisica: this.sobre.pessoaFisica,
      tipoDocumento: this.sobre.pessoaFisica == true ? "1" : "2",
      documento:
        this.sobre.pessoaFisica ? this.sobre.cpf : this.sobre.cnpj,
  
      razaoSocial: this.sobre.razaoSocial,
      nomeEstabelecimento: this.sobre.nomeEstabelecimento,
      horarioAbertura: this.sobre.horarioAbertura,
      horarioFechamento: this.sobre.horarioFechamento,
      descricao: this.sobre.descricao,
      contatoPrincipal: this.sobre.contatoPrincipal,
      contatoSecundario: this.sobre.contatoSecundario,
      email: this.sobre.email,
      rua: this.sobre.rua,
      numero: this.sobre.numero,
      bairro: this.sobre.bairro,
      cidade: this.sobre.cidade,
      estado: this.sobre.estado,
    });

  

    if (this.tipoDocumentoForm().value === '1') {
      this.documento().setValidators([
        Validators.required,
        NgBrazilValidators.cpf,
      ]);
    } else {
      this.documento().setValidators([
        Validators.required,
        NgBrazilValidators.cnpj,
      ]);
    }
  }

  documento(): AbstractControl {
    return this.sobreForm.get('documento');
  }

  ngAfterViewInit() {
    this.tipoDocumentoForm().valueChanges.subscribe(() => {
      this.trocarValidacaoDocumento();
      this.configurarElementosValidacao();
      this.validarFormulario();
    });

    this.configurarElementosValidacao();
  }

  configurarElementosValidacao() {
    let controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    merge(...controlBlurs).subscribe(() => {
      this.validarFormulario();
    });
  }

  trocarValidacaoDocumento() {
    if (this.tipoDocumentoForm().value === '1') {
      this.documento().clearValidators();
      this.documento().setValidators([
        Validators.required,
        NgBrazilValidators.cpf,
      ]);
    } else {
      this.documento().clearValidators();
      this.documento().setValidators([
        Validators.required,
        NgBrazilValidators.cnpj,
      ]);
    }
  }

  tipoDocumentoForm(): AbstractControl {
    return this.sobreForm.get('tipoDocumento');
  }

  validarFormulario() {
    this.displayMessage = this.genericValidator.processarMensagens(
      this.sobreForm
    );
  }

  editarInfo() {
    if (this.sobreForm.dirty && this.sobreForm.valid) {
      // this.sobre = Object.assign({}, this.sobre, this.sobreForm.value);
      this.sobre.contatoPrincipal = this.sobreForm.value.contatoPrincipal;
      this.sobre.razaoSocial = this.sobreForm.value.razaoSocial;
      this.sobre.nomeEstabelecimento = this.sobreForm.value.nomeEstabelecimento;
      this.sobre.horarioAbertura = '08:00';
      this.sobre.horarioFechamento = '09:00';
      this.sobre.descricao = this.sobreForm.value.descricao;
      this.sobre.email = this.sobreForm.value.email;


      this.sobre.rua = this.sobreForm.value.rua;
      this.sobre.numero = this.sobreForm.value.numero;
      this.sobre.bairro = this.sobreForm.value.bairro;
      this.sobre.cidade = this.sobreForm.value.cidade;
      this.sobre.estado = this.sobreForm.value.estado;

      if (this.sobreForm.value.tipoDocumento == "1") {
        this.sobre.cpf = this.sobreForm.value.documento;
        this.sobre.cnpj = '';
        this.sobre.pessoaFisica = true;
      } else {
        this.sobre.cnpj = this.sobreForm.value.documento;
        this.sobre.cpf = '';
        this.sobre.pessoaFisica = false;
      }

      console.log(this.sobre);

      this.sobreService.atualizarSobre(this.sobre).subscribe(
        (sucesso) => {
          this.processarSucesso(sucesso);
        },
        (falha) => {
          this.processarFalha(falha);
        }
      );
    }
  }

  processarSucesso(response: any) {
    this.sobreForm.reset();
    this.errors = [];

    let toast = this.toastr.success(
      'Sobre atualizado com sucesso!',
      'Sucesso!'
    );
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/adm/sobre/info']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Ops');
  }
}
