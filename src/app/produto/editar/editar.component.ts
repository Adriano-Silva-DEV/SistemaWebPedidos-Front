import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';

import { utilsBr } from 'js-brasil';
import { ToastrService } from 'ngx-toastr';

import { ValidationMessages, GenericValidator, DisplayMessage } from 'src/app/utils/generic-form-validation';

import { Produto} from '../models/produto';
import { ProdutoService } from '../services/produto.service';
import { Fornecedor } from 'src/app/fornecedor/models/fornecedor';
import { environment } from 'src/environments/environment';
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { CategoriaModel } from 'src/app/categoria/models/categoria';
import { CategoriaService } from 'src/app/categoria/services/categoriaService';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
 
  imagens: string = environment.imgUrl;
  produto: Produto;
  fornecedores: Fornecedor[];
  errors: any[] = [];
  produtoForm: FormGroup;

  categorias: CategoriaModel[];

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  MASKS = utilsBr.MASKS;
  formResult: string = '';

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  imagemURL: string;
  imagemNome: string;
  imgAtual: string;
  mudancasNaoSalvas: boolean;

  constructor(private fb: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private categoriaService: CategoriaService) {
      toastr.toastrConfig.progressBar=true;
      toastr.toastrConfig.timeOut = 1000;
      
    this.validationMessages = {
      fornecedorId: {
        required: 'Escolha um fornecedor',
      },
      nome: {
        required: 'Informe o Nome',
        minlength: 'Mínimo de 2 caracteres',
        maxlength: 'Máximo de 200 caracteres'
      },
      descricao: {
        required: 'Informe a Descrição',
        minlength: 'Mínimo de 2 caracteres',
        maxlength: 'Máximo de 1000 caracteres'
      },
      imagem1: {
        required: 'Informe a Imagem',
      },
      precoVenda: {
        required: 'Informe o Valor',
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.produto = this.route.snapshot.data['produto'];
  }

  ngOnInit(): void {

    this.produtoService.obterFornecedores()
      .subscribe(
        fornecedores => this.fornecedores = fornecedores);

        this.categoriaService.obterTodos()
        .subscribe(
          categorias => this.categorias = categorias);

    this.produtoForm = this.fb.group({
      fornecedorId: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      categoriaId: ['', [Validators.required]],
      descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]],
      imagem1: [''],
      precoVenda: ['', [Validators.required]],
      ativo: [0],
      imagem: ['']
    });

    this.produtoForm.patchValue({
      fornecedorId: this.produto.fornecedorId,
      categoriaId: this.produto.categoriaId,
      id: this.produto.id,
      nome: this.produto.nome,
      descricao: this.produto.descricao,
      ativo: this.produto.ativo,
      precoVenda: this.produto.precoVenda,
      imagem1: this.produto.imagem1
    });

    this.imgAtual = this.produto.imagem1;
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.produtoForm);
      this.mudancasNaoSalvas = true;
    });
  }

  editarProduto() {
    if (this.produtoForm.dirty && this.produtoForm.valid) {
      this.produto = Object.assign({}, this.produto, this.produtoForm.value);
     

      this.produto.imagemUpload = this.croppedImage.split(',')[1];
      
      this.produto.imagem1 = this.imgAtual;

      if(this.imagemNome)
      this.produto.imagem1 = this.imagemNome;
     //this.produto.precoVenda = CurrencyUtils.StringParaDecimal(this.produto.precoVenda);

     this.produtoService.atualizarProduto(this.produto)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.produtoForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Produto cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/produtos/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  } 


  
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imagemNome = event.currentTarget.files[0].name;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    this.showCropper = true;
  }
  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }
  loadImageFailed() {
    this.errors.push('O formato do arquivo ' + this.imagemNome + ' não é aceito.');
  }

  excluirImg(){
    this.imgAtual = null;
  }
}

