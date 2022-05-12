import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, merge, Observable } from 'rxjs';
import { Produto } from 'src/app/produto/models/produto';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { CategoriaModel } from '../models/categoria';
import { CategoriaService } from '../services/categoriaService';
import { ListaProdutosComponent } from 'src/app/produto/lista-produtos/lista-produtos.component';
import { ProdutoService } from 'src/app/produto/services/produto.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  errors: any[] = [];
  categoriaForm: FormGroup;
  categoria: CategoriaModel = new CategoriaModel();

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};
  formResult: string = '';

  mudancasNaoSalvas: boolean;
  produtos: Produto[];
  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private produtoService: ProdutoService
  ) {
    toastr.toastrConfig.progressBar=true;
    toastr.toastrConfig.timeOut = 1000;
    
    this.validationMessages = {
      nome: {
        required: 'Informe o Nome da categoria', 
        minlength: 'Mínimo de 2 caracteres',
        maxlength: 'Máximo de 25 caracteres'       
      },
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
    this.categoria = this.route.snapshot.data['categoria'];
    this.popularProdutos(this.categoria.id);
}
  ngOnInit(): void {
    this.spinner.show();
    this.categoriaForm = this.fb.group({
      nome: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(25)]],
      ativo: [],
    });

    this.preencherForm();     
    this.spinner.hide();
  }

  preencherForm() {

    this.categoriaForm.patchValue({
      id: this.categoria.id,
      nome: this.categoria.nome,
      ativo: this.categoria.ativo,
    });
  }

  ngAfterViewInit(): void {
    this.configurarElementosValidacao();
   }
 
   configurarElementosValidacao(){
     let controlBlurs: Observable<any>[] = this.formInputElements.map(
       (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
     );
     merge(...controlBlurs).subscribe(() => {
       this.validarFormulario();
     });
   }
 
   validarFormulario(){
     this.displayMessage = this.genericValidator.processarMensagens(this.categoriaForm);
     this.mudancasNaoSalvas= true;
   }

 
   adicionarCategoria() {
     if (this.categoriaForm.dirty && this.categoriaForm.valid) {
       this.categoria =    this.categoriaForm.value
 
       this.categoriaService.novaCategoria(this.categoria).subscribe(
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
     this.categoriaForm.reset();
     this.errors = [];
 
     let toast = this.toastr.success(
       'categoria cadastrado com sucesso!',
       'Sucesso!'
     );
     if (toast) {
       toast.onHidden.subscribe(() => {
         this.router.navigate(['/adm/categoria/listar-todos']);
       });
     }
   }
 
   processarFalha(fail: any) {
     this.errors = fail.error.errors.Nome;
     this.toastr.error('Ocorreu um erro!', 'Ops');

   }

   popularProdutos(id: string){
    this.spinner.show();
  this.produtoService.obterPorCategoria(id).subscribe(
    (produtos) => {
      this.produtos = produtos;
      this.spinner.hide();
    },
    (error) => {
      this.errors;
      this.spinner.hide();
    }
  );
}
 }
 

